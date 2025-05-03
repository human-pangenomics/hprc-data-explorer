from __future__ import annotations 

import re
import sys
from datetime import (
    date,
    datetime,
    time
)
from decimal import Decimal 
from enum import Enum 
from typing import (
    Any,
    ClassVar,
    Dict,
    List,
    Literal,
    Optional,
    Union
)

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    RootModel,
    field_validator
)


metamodel_version = "None"
version = "None"


class ConfiguredBaseModel(BaseModel):
    model_config = ConfigDict(
        validate_assignment = True,
        validate_default = True,
        extra = "forbid",
        arbitrary_types_allowed = True,
        use_enum_values = True,
        strict = False,
    )
    pass




class LinkMLMeta(RootModel):
    root: Dict[str, Any] = {}
    model_config = ConfigDict(frozen=True)

    def __getattr__(self, key:str):
        return getattr(self.root, key)

    def __getitem__(self, key:str):
        return self.root[key]

    def __setitem__(self, key:str, value):
        self.root[key] = value

    def __contains__(self, key:str) -> bool:
        return key in self.root


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/assemblies.yaml#',
     'description': 'Schema for source assemblies.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/assemblies.yaml#',
     'imports': ['linkml:types'],
     'name': 'assemblies',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': './catalog/schema/assemblies.yaml'} )

class PhasingApproach(str, Enum):
    trio = "trio"
    hic = "hic"
    strandseq = "strandseq"



class Assembly(ConfiguredBaseModel):
    """
    An assembly.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/assemblies.yaml#'})

    sample_id: str = Field(default=..., description="""Sample ID.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })
    assembly_name: str = Field(default=..., description="""Unique assembly name.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_name', 'domain_of': ['Assembly']} })
    haplotype: int = Field(default=..., description="""Haplotype.""", ge=0, le=2, json_schema_extra = { "linkml_meta": {'alias': 'haplotype', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })
    phasing: PhasingApproach = Field(default=..., description="""Phasing approach used to separate assembled sequences into distinct haplotypes, with or without parent-of-origin assignment.""", json_schema_extra = { "linkml_meta": {'alias': 'phasing', 'domain_of': ['Assembly']} })
    assembly_method: Optional[str] = Field(default=None, description="""Assembly method.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_method', 'domain_of': ['Assembly']} })
    assembly_method_version: Optional[str] = Field(default=None, description="""Assembly method version.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_method_version', 'domain_of': ['Assembly']} })
    assembly_date: Optional[str] = Field(default=None, description="""Date assembly was uploaded to Genbank (by convention).""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_date', 'domain_of': ['Assembly']} })
    genbank_accession: Optional[str] = Field(default=None, description="""Genbank accession.""", json_schema_extra = { "linkml_meta": {'alias': 'genbank_accession', 'domain_of': ['Assembly']} })
    assembly_md5: Optional[str] = Field(default=None, description="""S3 URI to assembly MD5.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_md5', 'domain_of': ['Assembly']} })
    assembly_fai: Optional[str] = Field(default=None, description="""S3 URL to assembly FAI.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_fai', 'domain_of': ['Assembly']} })
    assembly_gzi: Optional[str] = Field(default=None, description="""S3 URI to assembly GZI.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_gzi', 'domain_of': ['Assembly']} })
    assembly: str = Field(default=..., description="""S3 URI to assembly.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })


class ReleaseOneAssembly(ConfiguredBaseModel):
    """
    An assembly using the legacy Release 1 fields.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/assemblies.yaml#'})

    sample_id: str = Field(default=..., description="""Sample ID.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })
    haplotype: int = Field(default=..., description="""Haplotype.""", ge=0, le=2, json_schema_extra = { "linkml_meta": {'alias': 'haplotype', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })
    assembly: str = Field(default=..., description="""S3 URI to assembly.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly', 'domain_of': ['Assembly', 'ReleaseOneAssembly']} })
    fasta_sha256: str = Field(default=..., description="""FASTA SHA256.""", json_schema_extra = { "linkml_meta": {'alias': 'fasta_sha256', 'domain_of': ['ReleaseOneAssembly']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Assembly.model_rebuild()
ReleaseOneAssembly.model_rebuild()

