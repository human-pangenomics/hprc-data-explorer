#!/bin/bash



# Run linkml-lint on the schema file
linkml-lint hprc-catalog-schema.yaml --validate --verbose

#python validate-schema.py 
# I see now it's difficult to specify all of hte schema to detail. So you can start off with "string" and then add more as you go.

