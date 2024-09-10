## Getting Started

This app requires Node `20.10.0`. If you do not have Node installed, download it from its
[website](https://nodejs.org/en/download/package-manager) and use a version manager such as
[n](https://www.npmjs.com/package/n/v/5.0.1) to select that version.

Once you have Node installed with the correct version, clone the repository using:
```shell
git clone git@github.com:human-pangenomics/hprc-data-explorer.git
```

Then, install the required packages using:
```shell
npm ci
```

Check that the file `files/out/raw-sequencing-data.json` is present.
If it is not, build it by running:

```shell
npm run build-hprc-db
```

You're now ready to go! With that file made, you can run the development server:

```shell
npm run dev
# or
yarn dev
```

Once the server is running, visit [localhost:3000](localhost:3000) to view the Explorer!

### Building the data source files
The raw seqencing, assemblies, and annotations data are generated through a Python script. To create a virtual environment
and install the required libraries, use the following commands from the root project directory:
```shell
python3 -m venv ./venv
source ./venv/bin/activate
pip install -r files/requirements.txt
```
Then run the scripts with:
```shell
python3 files/build-raw-sequencing-files.py
python3 files/build-assemblies-data.py
python3 files/build-annotations-data.py
```
The environment can be deactivated by running `deactivate`, and re-activated by running `source ./venv/bin/activate`
again.
