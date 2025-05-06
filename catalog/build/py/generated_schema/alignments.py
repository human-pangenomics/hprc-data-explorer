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


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/alignments.yaml#',
     'description': 'Schema for source alignments.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/alignments.yaml#',
     'imports': ['linkml:types'],
     'name': 'alignments',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': './catalog/schema/alignments.yaml'} )


class Alignment(ConfiguredBaseModel):
    """
    An alignment.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/alignments.yaml#'})

    alignment: str = Field(default=..., description="""Alignment.""", json_schema_extra = { "linkml_meta": {'alias': 'alignment', 'domain_of': ['Alignment']} })
    file_size: str = Field(default=..., description="""File size.""", json_schema_extra = { "linkml_meta": {'alias': 'file_size', 'domain_of': ['Alignment']} })
    file: str = Field(default=..., description="""File name.""", json_schema_extra = { "linkml_meta": {'alias': 'file', 'domain_of': ['Alignment']} })
    loc: str = Field(default=..., description="""S3 URI to file.""", json_schema_extra = { "linkml_meta": {'alias': 'loc', 'domain_of': ['Alignment']} })
    pipeline: str = Field(default=..., description="""Pipeline.""", json_schema_extra = { "linkml_meta": {'alias': 'pipeline', 'domain_of': ['Alignment']} })
    reference_coordinates: Optional[str] = Field(default=None, description="""Reference coordinates.""", json_schema_extra = { "linkml_meta": {'alias': 'reference_coordinates', 'domain_of': ['Alignment']} })
    version: Optional[str] = Field(default=None, description="""HPRC version.""", json_schema_extra = { "linkml_meta": {'alias': 'version', 'domain_of': ['Alignment']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Alignment.model_rebuild()

