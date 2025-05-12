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


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/annotations.yaml#',
     'description': 'Schema for source annotations.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/annotations.yaml#',
     'imports': ['linkml:types'],
     'name': 'annotations',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': './catalog/schema/annotations.yaml'} )


class Annotation(ConfiguredBaseModel):
    """
    An annotation.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/annotations.yaml#',
         'slot_usage': {'haplotype': {'name': 'haplotype', 'required': True}}})

    sample_id: str = Field(default=..., description="""Sample ID.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })
    haplotype: int = Field(default=..., description="""Haplotype.""", ge=0, le=2, json_schema_extra = { "linkml_meta": {'alias': 'haplotype', 'domain_of': ['Annotation', 'ReleaseOneAnnotation']} })
    assembly_name: str = Field(default=..., description="""Unique assembly name.""", json_schema_extra = { "linkml_meta": {'alias': 'assembly_name', 'domain_of': ['Annotation']} })
    location: str = Field(default=..., description="""S3 URI to annotation.""", json_schema_extra = { "linkml_meta": {'alias': 'location',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })


class ReleaseOneAnnotation(ConfiguredBaseModel):
    """
    An annotation using the legacy Release 1 fields.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/annotations.yaml#'})

    sample_id: str = Field(default=..., description="""Sample ID.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })
    haplotype: Optional[int] = Field(default=..., description="""Haplotype.""", ge=0, le=2, json_schema_extra = { "linkml_meta": {'alias': 'haplotype', 'domain_of': ['Annotation', 'ReleaseOneAnnotation']} })
    location: str = Field(default=..., description="""S3 URI to annotation.""", json_schema_extra = { "linkml_meta": {'alias': 'location',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })


class ReleaseOneFlaggerAnnotation(ConfiguredBaseModel):
    """
    An annotation using the legacy Release 1 fields for Flagger.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/annotations.yaml#'})

    sample_id: str = Field(default=..., description="""Sample ID.""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })
    location: str = Field(default=..., description="""S3 URI to annotation.""", json_schema_extra = { "linkml_meta": {'alias': 'location',
         'domain_of': ['Annotation',
                       'ReleaseOneAnnotation',
                       'ReleaseOneFlaggerAnnotation']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
Annotation.model_rebuild()
ReleaseOneAnnotation.model_rebuild()
ReleaseOneFlaggerAnnotation.model_rebuild()

