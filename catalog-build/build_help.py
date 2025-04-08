from pathlib import Path
from urllib.parse import urlparse
import requests
import pandas as pd

def download_file(url, output_folder_path):
    filename = Path(urlparse(url).path).name
    output_path = Path(output_folder_path, filename)
    with requests.get(url) as r:
        if r.status_code != 200:
            raise RuntimeError(f"{url} caused error {r.status_code}. See details below:\n {r.text}")
        print(f"Downloading:\n {url}\n to {output_path}")
        with open(output_path.resolve(), "w") as f:
            f.write(r.text)
    return output_path

def download_files_for_releases(release_specific_files_info, file_key, output_folder_path):
    return [
        {
            "release": release_info["release"],
            "path": download_file(release_info[file_key]["url"], output_folder_path),
            **release_info[file_key],
        }
        for release_info in release_specific_files_info
    ]

def load_joined_files_for_releases(files_info):
    df = None
    for info in files_info:
        # Read file for current release, and apply formatter if specified
        release_df = pd.read_csv(info["path"], sep=info["sep"])
        if "input_formatter" in info:
            release_df = info["input_formatter"](release_df)
        release_df["release"] = info["release"]
        # Join with previes DF
        df = release_df if df is None else pd.concat([df, release_df], ignore_index=True).fillna("N/A")
        # Update data to match format for next release
        if "mapper" in info:
            df = info["mapper"](df)
        if "columns" in info:
            df = df[[*info["columns"].keys(), "release"]].rename(columns=info["columns"])
    if df is None:
        raise Exception("No files specified")
    return df


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
