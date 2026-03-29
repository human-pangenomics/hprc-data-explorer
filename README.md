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

Run the development server

```shell
npm run dev
# or
yarn dev
```

Once the server is running, visit [localhost:3000](localhost:3000) to view the Explorer!

## Building the Catalog Files

To rebuild the catalog files when the catalog data has been updated, you will need the Python prerequisites installed in addition to the JavaScript requirements described above; these consist of:

1. [pyenv](https://github.com/pyenv/pyenv), used by the setup script for version management.
2. [Poetry](https://python-poetry.org/), used to manage dependencies.

Run `setup_poetry_pyenv.sh` in the project root directory to set up the Python virtual environment.


See [catalog/README.md](catalog/README.md) for instructions on running the catalog build scripts.
