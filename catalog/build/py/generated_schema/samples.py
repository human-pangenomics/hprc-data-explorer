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
        extra = "ignore",
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


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/samples.yaml#',
     'description': 'Schema for source samples.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/samples.yaml#',
     'imports': ['linkml:types'],
     'name': 'samples',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': './catalog/schema/samples.yaml'} )


class Sample(ConfiguredBaseModel):
    """
    A sample.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/samples.yaml#'})

    sample_id: str = Field(default=..., description="""Sample ID to identify sample. This is typically the Catalog ID from Coriell. When names with the prefix HG are not available, NA is preferred over GM. For example NA18982 should be used instead of GM18982 though in some cases both NA and GM may be used to identify the same sample.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id', 'domain_of': ['Sample']} })
    biosample_id: Optional[str] = Field(default=..., description="""NCBI BioSample ID used for sequence read and assembly uploads. Also called biosample_accession""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_id', 'domain_of': ['Sample']} })
    population_descriptor: Optional[str] = Field(default=..., description="""Population descriptor from NHGRI collection. Describes ancestral geography or ethnicity of each population and the geographic location where the samples from that population were collected.""", json_schema_extra = { "linkml_meta": {'alias': 'population_descriptor', 'domain_of': ['Sample']} })
    population_abbreviation: Optional[str] = Field(default=..., description="""Abbreviation for population descriptor.""", json_schema_extra = { "linkml_meta": {'alias': 'population_abbreviation', 'domain_of': ['Sample']} })
    family_id: Optional[str] = Field(default=..., description="""Family ID from 1000G pedigree data. For samples who are not part of a trio dataset in 1000G this is left blank.""", json_schema_extra = { "linkml_meta": {'alias': 'family_id', 'domain_of': ['Sample']} })
    paternal_id: Optional[str] = Field(default=..., description="""Sample ID of father of trio. For non-trio samples this is left blank.""", json_schema_extra = { "linkml_meta": {'alias': 'paternal_id', 'domain_of': ['Sample']} })
    maternal_id: Optional[str] = Field(default=..., description="""Sample ID of mother of trio. For non-trio samples this is left blank.""", json_schema_extra = { "linkml_meta": {'alias': 'maternal_id', 'domain_of': ['Sample']} })
    alternative_id: Optional[str] = Field(default=..., description="""Alternative sample ID (included if it is often used in other sequencing and assembly efforts)""", json_schema_extra = { "linkml_meta": {'alias': 'alternative_id', 'domain_of': ['Sample']} })
    sex: Optional[str] = Field(default=..., description="""Sex of donor""", json_schema_extra = { "linkml_meta": {'alias': 'sex', 'domain_of': ['Sample']} })
    tissue: Optional[str] = Field(default=..., description="""Tissue where B-Lymphocyte likely means that the sample is sourced from EBV-transformed B cells.""", json_schema_extra = { "linkml_meta": {'alias': 'tissue', 'domain_of': ['Sample']} })
    trio_available: Optional[bool] = Field(default=..., description="""TRUE if a sample is the child in a trio and the parental sequencing data is available for phasing.""", json_schema_extra = { "linkml_meta": {'alias': 'trio_available', 'domain_of': ['Sample']} })
    collection: Optional[str] = Field(default=..., description="""Collection that sample was pulled from.""", json_schema_extra = { "linkml_meta": {'alias': 'collection', 'domain_of': ['Sample']} })
    project: Optional[str] = Field(default=..., description="""The project the sample was a part of prior to inclusion in HPRC.""", json_schema_extra = { "linkml_meta": {'alias': 'project', 'domain_of': ['Sample']} })
    contributors: Optional[str] = Field(default=..., description="""The group or groups responsible for the inclusion of this sample in HPRC and its primary publication.""", json_schema_extra = { "linkml_meta": {'alias': 'contributors', 'domain_of': ['Sample']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Sample.model_rebuild()

