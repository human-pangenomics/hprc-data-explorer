

# Slot: file_format


_An indication of the format of an electronic file; include the full file extension including compression extensions. Usually aligns with file extension (e.g. bam, sam, text, csv, etc.)_





URI: [https://humanpangenome.org/hprc-data-explorer/:file_format](https://humanpangenome.org/hprc-data-explorer/:file_format)



<!-- no inheritance hierarchy -->





## Applicable Classes

| Name | Description | Modifies Slot |
| --- | --- | --- |
| [SequencingFile](SequencingFile.md) | A file containing sequencing data |  no  |







## Properties

* Range: [String](String.md)





## Identifier and Mapping Information







### Schema Source


* from schema: https://humanpangenome.org/hprc-data-explorer




## Mappings

| Mapping Type | Mapped Value |
| ---  | ---  |
| self | https://humanpangenome.org/hprc-data-explorer/:file_format |
| native | https://humanpangenome.org/hprc-data-explorer/:file_format |




## LinkML Source

<details>
```yaml
name: file_format
description: An indication of the format of an electronic file; include the full file
  extension including compression extensions. Usually aligns with file extension (e.g.
  bam, sam, text, csv, etc.)
from_schema: https://humanpangenome.org/hprc-data-explorer
rank: 1000
alias: file_format
domain_of:
- SequencingFile
range: string

```
</details>