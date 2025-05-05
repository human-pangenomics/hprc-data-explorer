#!/bin/bash

SCHEMA_NAMES=(sequencing_data assemblies annotations)

# Generate Pydantic models
for name in ${SCHEMA_NAMES[@]}
do
  gen-pydantic ./catalog/schema/$name.yaml > ./catalog/build/py/generated_schema/$name.py
done

# Generate TypeScript definitions
schema_paths=()
for name in ${SCHEMA_NAMES[@]}
do
  schema_paths+=("./catalog/schema/$name.yaml")
done
python ./catalog/schema/scripts/gen_slot_name_types.py "${schema_paths[@]}" > ./catalog/schema/generated/schema.ts
