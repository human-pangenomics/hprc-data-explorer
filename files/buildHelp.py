from pathlib import Path
from urllib.parse import urlparse
import requests

def downloadFile(url, outputFolderPath):
    filename = Path(urlparse(url).path).name
    outputPath = Path(outputFolderPath, filename)
    with requests.get(url) as r:
        if r.status_code != 200:
            raise RuntimeError(f"{url} caused error {r.status_code}. See details below:\n {r.text}")
        print(f"Downloading:\n {url}\n to {outputPath}")
        with open(outputPath.resolve(), "w") as f:
            f.write(r.text)
    return outputPath