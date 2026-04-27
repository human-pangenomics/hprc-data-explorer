# Catalog build report

## Notes

- The version of this report that is linked from the HPRC Data Explorer website corresponds to the version of the catalog that is present on the site. The most recent version of the report, including undeployed updates, can be found [on the main branch](https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/build/reports/catalog-build-report.md).
- As catalog build scripts may be run independently of each other, some parts of this report may be more up-to-date than others, although they should all be applicable to what's displayed in the app as long as `npm run build-catalog` is the most recent catalog build script to have been run.
- For reference when considering duplicated entity IDs, the functions used to generate IDs can be found in [utils.ts](../../../app/apis/catalog/hprc-data-explorer/common/utils.ts).

## Samples

### Validation errors

None

### Duplicated IDs for which entities were removed

None

## Raw sequencing data

### Validation errors

- hic_sheet.csv:
  - basecaller: Input should be a valid string (source rows 2-3003)
  - basecaller_version: Input should be a valid string (source rows 2-3003)

### File URI errors

None

### Linked samples not found in samples list

None

### Duplicated IDs for which entities were removed

None

## Assemblies

### Validation errors

None

### File URI errors

None

### Linked samples not found in samples list

- HG03492

### Duplicated IDs for which entities were removed

None

## Annotations

### Validation errors

None

### File URI errors

None

### Linked samples not found in samples list

- GCA_000001405.15_GRCh38_no_alt_analysis_set
- HG03492
- chm13

### Duplicated IDs for which entities were removed

None

## Alignments

### Validation errors

None

### Duplicated IDs for which entities were removed

- https://s3-us-west-2.amazonaws.com/human-pangenomics/pangenomes/freeze/freeze1/minigraph-cactus/filtered/hprc-v1.0-mc-grch38-minaf.0.1.dist.old