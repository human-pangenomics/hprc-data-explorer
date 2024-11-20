

## Building the catalog-build/source Files

The raw sequencing, assemblies, and annotations source files are generated through Python scripts.

To create a virtual environment and install the required libraries, use the following commands from the root project directory:

```shell
python3 -m venv ./venv
source ./venv/bin/activate
pip install -r catalog-build/requirements.txt
```

Then run the scripts from this directory with:
```shell
python3 build-sequencing-data.py
python3 build-assemblies.py
python3 build-annotations.py
```


This can also be accomplshed by running
```shell
npm run build-catalog-source
```

The environment can be deactivated by running `deactivate`, and re-activated by running `source ./venv/bin/activate`
again.

## Building the Catalog Files

Once the source files are generated, you can build the /catalog files with:

```shell
npm run build-catalog
```

