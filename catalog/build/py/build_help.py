from pathlib import Path
from urllib.parse import urlparse
import requests
import pandas as pd

def map_columns(df, **mappers):
    mapped_columns = {name: df[name].map(mapper) for name, mapper in mappers.items()}
    return df.assign(**mapped_columns)

def columns_mapper(**mappers):
    return lambda df: map_columns(df, **mappers)


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
