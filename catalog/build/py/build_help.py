from pathlib import Path
from urllib.parse import urlparse
import requests
import pandas as pd
from pydantic import ValidationError

class HprcValidationError(Exception):
    pass

class HprcFieldValidationError(HprcValidationError):
    def __init__(self, message, row, field):
        super().__init__(message)
        self.message = message
        self.row = row
        self.field = field

class HprcSourceFileValidationError(HprcValidationError):
    def __init__(self, message, filename, errors):
        super().__init__(message)
        self.message = message
        self.filename = filename
        self.errors = errors


def map_columns(df, **mappers):
    mapped_columns = {name: df[name].map(mapper) for name, mapper in mappers.items()}
    return df.assign(**mapped_columns)

def columns_mapper(**mappers):
    return lambda df: map_columns(df, **mappers)


def get_pydantic_field_names(model):
    return model.__pydantic_fields__.keys()

def cast_int(value, row, field):
    try:
        return int(value)
    except ValueError:
        raise HprcFieldValidationError("Unable to parse value as integer", row, field)

def cast_float(value, row, field):
    try:
        return float(value)
    except ValueError:
        raise HprcFieldValidationError("Unable to parse value as float", row, field)

def cast_bool(value, row, field):
    if value == "TRUE": return True
    if value == "FALSE": return False
    raise HprcFieldValidationError("Unable to parse value as boolean", row, field)

def get_slot_type_mapper(slot, enum_names):
    if slot.range in enum_names: return None
    match slot.range:
        case "string":
            return None
        case "integer":
            return cast_int
        case "float":
            return cast_float
        case "boolean":
            return cast_bool
        case _:
            raise Exception(f"Handling not implemented for range {slot.range}")

def get_field_type_mappers(schemaview, model):
    slot_names = get_pydantic_field_names(model)
    enum_names = schemaview.all_enums().keys()
    return {name: mapper for name, mapper in ((name, get_slot_type_mapper(schemaview.induced_slot(name), enum_names)) for name in slot_names) if mapper is not None}

def cast_row(source_row_dict, row_index, field_type_mappers):
    return {
        k: None if v == "" else field_type_mappers[k](v, row_index, k) if k in field_type_mappers else v
        for k, v in source_row_dict.items()
    }

def validate_row(source_row_dict, row_index, field_type_mappers, model):
    try:
        row_dict = cast_row(source_row_dict, row_index, field_type_mappers)
    except HprcFieldValidationError as err:
        return [err]
    try:
        model.model_validate(row_dict)
        return None
    except ValidationError as err:
        return [HprcFieldValidationError(e["msg"], row_index, e["loc"][0]) for e in err.errors()]

def validate_and_normalize_df(df, model, schemaview):
    field_type_mappers = get_field_type_mappers(schemaview, model)
    rows = df.to_dict(orient="records")
    errors = [err for result in (validate_row(row, i + 2, field_type_mappers, model) for i, row in enumerate(rows)) if result is not None for err in result]

    missing_columns = [name for name in get_pydantic_field_names(model) if name not in df]

    if missing_columns:
        df_with_schema_columns = df.copy()
        for name in missing_columns:
            df_with_schema_columns[name] = ""
    else:
        df_with_schema_columns = df
    
    return (df_with_schema_columns, errors)

def load_and_validate_csv(path, model, schemaview):
    df = pd.read_csv(path, sep=",", usecols=lambda name: not name.startswith("Unnamed:"), dtype=str, keep_default_na=False)
    return validate_and_normalize_df(df, model, schemaview)


def format_index_list(ordered_indices):
    ranges = []
    prev_index = None
    for index in ordered_indices:
        if prev_index == index - 1:
            if isinstance(ranges[-1], list):
                ranges[-1][1] = index
            else:
                ranges[-1] = [ranges[-1], index]
        else:
            ranges.append(index)
        prev_index = index
    range_strings = [str(r[0]) + "-" + str(r[1]) if isinstance(r, list) else str(r) for r in ranges]
    if len(range_strings) > 2:
        return ", ".join(range_strings[:-1]) + ", and " + range_strings[-1]
    else:
        return " and ".join(range_strings)

def format_file_errors(errors):
    rows_by_field_and_message = {}
    for err in errors:
        field_and_message = (err.field, err.message)
        if field_and_message not in rows_by_field_and_message:
            rows_by_field_and_message[field_and_message] = [err.row]
        else:
            rows_by_field_and_message[field_and_message].append(err.row)
    return "\n".join(
        f"{field_and_message[0]}: {field_and_message[1]} (source {"row" if len(rows) == 1 else "rows"} {format_index_list(rows)})"
        for field_and_message, rows in rows_by_field_and_message.items()
    )

def format_errors_by_file(errors_by_file):
    return "\n\n".join(f"{filename}:\n{format_file_errors(errors)}" for filename, errors in errors_by_file.items())


def download_file(url, output_folder_path, filename=None):
    if filename is None:
        filename = Path(urlparse(url).path).name
    output_path = Path(output_folder_path, filename)
    with requests.get(url) as r:
        if r.status_code != 200:
            raise RuntimeError(f"{url} caused error {r.status_code}. See details below:\n {r.text}")
        print(f"Downloading:\n {url}\n to {output_path}")
        with open(output_path.resolve(), "w") as f:
            f.write(r.text)
    return output_path

def load_dataframe_from_spec(spec, output_folder_path, post_load_processor=None, extra_columns_to_retain=[], parent_spec=None):
    # Inherit "sep"
    if parent_spec is not None and "sep" in parent_spec:
        spec = {"sep": parent_spec["sep"], **spec}

    if "url" in spec: # Get source dataframe from URL(s)
        if "sep" not in spec:
            raise Exception("Separator not specified for delimited values file URL")
        sep = spec["sep"]
        urls = [spec["url"]] if isinstance(spec["url"], str) else spec["url"]
        paths = [download_file(url, output_folder_path) for url in urls]
        df = pd.concat([pd.read_csv(path, sep=sep) for path in paths])
    elif "source" in spec: # Get source dataframe from spec(s)
        sources = [spec["source"]] if isinstance(spec["source"], dict) else spec["source"]
        df = pd.concat([load_dataframe_from_spec(source, output_folder_path, parent_spec=spec) for source in sources])
    else:
        raise Exception("No dataframe source specified")
    
    if "na" in spec:
        df = df.fillna(spec["na"])
    if "input_formatter" in spec:
        df = spec["input_formatter"](df)
    
    if post_load_processor is not None:
        df = post_load_processor(df)

    if "mapper" in spec:
        df = spec["mapper"](df)
    if "columns" in spec:
        df = df[[*spec["columns"].keys(), *extra_columns_to_retain]].rename(columns=spec["columns"])
    
    return df

def append_df_for_release(base_df, release_df, release):
    release_df = release_df.copy()
    release_df["release"] = release
    return release_df if base_df is None else pd.concat([base_df, release_df], ignore_index=True).fillna("N/A")

def load_data_for_releases(releases_info, output_folder_path):
    dfs = {}
    for info in releases_info:
        dfs_info = {**info}
        release = dfs_info.pop("release")
        for key, spec in dfs_info.items():
            prev_df = dfs.get(key)
            dfs[key] = load_dataframe_from_spec(
                spec,
                output_folder_path,
                lambda df: append_df_for_release(prev_df, df, release),
                ["release"]
            )
    return dfs


def get_file_size(uri, total_files, current_index, entity_type_name):
    """
    Convert S3 URI to HTTPS if necessary and fetch file size using HEAD request.
    Show progress by printing remaining files to process.
    """
    try:
        # Convert S3 to HTTPS URL
        if uri.startswith("s3://"):
            bucket, *key_parts = uri[5:].split("/")  # Remove `s3://` and split to extract bucket and key
            uri = f"https://{bucket}.s3.amazonaws.com/{"/".join(key_parts)}"

        # Make HEAD request to get file size
        response = requests.head(uri, timeout=10)
        if response.status_code == 200:
            if "Content-Length" in response.headers:
                return int(response.headers["Content-Length"])
            else:
                print(f"No `Content-Length` header received from {uri}")
                return "N/A"
        else:
            print(f"Received {response.status_code} response from {uri}")
            return "N/A"
    except Exception:
        print(f"Exception occurred while requesting {uri}")
        return "N/A"
    finally:
        # Update progress
        remaining_files = total_files - current_index - 1
        print(f"Remaining {entity_type_name} files to process: {remaining_files}")

def get_file_sizes_from_uris(uris, entity_type_name):
    total_files = len(uris)
    return [
        get_file_size(uri, total_files, index, entity_type_name)
        for index, uri in enumerate(uris)
    ]
