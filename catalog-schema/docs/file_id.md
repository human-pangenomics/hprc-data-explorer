

# Slot: file_id


_A unique identifier for the file._





URI: [https://humanpangenome.org/hprc-data-explorer/:file_id](https://humanpangenome.org/hprc-data-explorer/:file_id)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [SequencingFile](SequencingFile.md) | A file containing sequencing data |  no  |







## Properties

* Range: [String](String.md)

* Required: True





## Identifier and Mapping Information







### Schema Source


* from schema: https://humanpangenome.org/hprc-data-explorer




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://humanpangenome.org/hprc-data-explorer/:file_id |
| native | https://humanpangenome.org/hprc-data-explorer/:file_id |




## LinkML Source

<details>
```yaml
name: file_id
description: A unique identifier for the file.
from_schema: https://humanpangenome.org/hprc-data-explorer
rank: 1000
identifier: true
alias: file_id
domain_of:
- SequencingFile
range: string
required: true
inlined: true

```
</details>