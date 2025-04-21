#!/bin/bash

# Ensure the script stops on errors
set -e

# Check if pyenv is installed, and provide installation instructions if not
if ! command -v pyenv &>/dev/null; then
  echo
  echo "Error: pyenv is not installed."
  echo
  echo "To install pyenv, run the following command:"
  echo "  brew install pyenv"
  echo
  exit 1
fi

# Check if poetry is installed, and provide installation instructions if not
if ! command -v poetry &>/dev/null; then
  echo
  echo "Error: Poetry is not installed."
  echo
  echo "To install Poetry, run the following command:"
  echo "  brew install poetry"
  echo
  exit 1
fi

# Read the Python version from .python-version file
PYTHON_VERSION=$(cat .python-version 2>/dev/null || echo "")
if [ -z "$PYTHON_VERSION" ]; then
  echo
  echo "Error: No .python-version file found or it is empty."
  echo "Please create a .python-version file with the desired Python version, e.g., '3.12.4'."
  echo
  exit 1
fi

# Check if the specified Python version is installed
if ! pyenv versions --bare | grep -q "^${PYTHON_VERSION}$"; then
  echo
  echo "Python version ${PYTHON_VERSION} is not installed. Installing it with pyenv..."
  pyenv install "${PYTHON_VERSION}"
fi

# Use the version of Python specified in the .python-version file
pyenv local

# Tell Poetry to use the version of Python specified in the .python-version file
poetry env use $(pyenv which python)

# Install the project dependencies
poetry install



