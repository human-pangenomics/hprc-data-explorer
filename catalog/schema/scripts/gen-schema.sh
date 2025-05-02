#!/bin/bash

# Generate Pydantic models
gen-pydantic ./catalog/schema/sequencing_data.yaml > ./catalog/build/py/generated_schema/sequencing_data.py
gen-pydantic ./catalog/schema/assemblies.yaml > ./catalog/build/py/generated_schema/assemblies.py
