

## Building the catalog/build/intermediate Files

The raw sequencing, assemblies, and annotations source files are generated through Python scripts.

See [README.md](../README.md) in the repository root for instructions on setting up the Python environment.

Then run the scripts from the `catalog/build/py` directory with:
```shell
poetry run python build_sequencing-data.py
poetry run python build_assemblies.py
poetry run python build_annotations.py
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

