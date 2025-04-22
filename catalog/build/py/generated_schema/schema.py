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


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#',
     'description': 'Schema for source sequencing data.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#',
     'imports': ['linkml:types'],
     'name': 'sequencing_data',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': 'catalog/schema/sequencing_data.yaml'} )


class SequencingData(ConfiguredBaseModel):
    """
    A sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })


class HiCSequencingData(SequencingData):
    """
    A HiC sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: str = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: str = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: str = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    coverage: float = Field(default=..., description="""Estimated coverage depth of the genome.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    data_type: str = Field(default=..., description="""Content of data file.""", json_schema_extra = { "linkml_meta": {'alias': 'data_type',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    design_description: str = Field(default=..., description="""Brief description of materials and methods.""", json_schema_extra = { "linkml_meta": {'alias': 'design_description',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: str = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: str = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_ID: str = Field(default=..., description="""Short identifier for library ID.""", json_schema_extra = { "linkml_meta": {'alias': 'library_ID',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_selection: str = Field(default=..., description="""Method of selection of library source material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_selection',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: str = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    ntsm_score: Optional[float] = Field(default=None, description="""Normalized Trans-Scaffold Mappability score.""", json_schema_extra = { "linkml_meta": {'alias': 'ntsm_score',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: str = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    production: str = Field(default=..., description="""Name of original data submisson.""", json_schema_extra = { "linkml_meta": {'alias': 'production',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    shear_method: str = Field(default=..., description="""Approach to initial DNA fragmentation.""", json_schema_extra = { "linkml_meta": {'alias': 'shear_method',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    study: str = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_bp: int = Field(default=..., description="""Total number of base pairs in the file.""", json_schema_extra = { "linkml_meta": {'alias': 'total_bp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData']} })
    total_gbp: Optional[float] = Field(default=None, description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })


class DeepConsensusSequencingData(SequencingData):
    """
    A DeepConsensus sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: str = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: str = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: str = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    deepconsensus_version: str = Field(default=..., description="""Version of DeepConsensus software used for rebasecalling HiFi data.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_version',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    design_description: str = Field(default=..., description="""Brief description of materials and methods.""", json_schema_extra = { "linkml_meta": {'alias': 'design_description',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: str = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: str = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_ID: str = Field(default=..., description="""Short identifier for library ID.""", json_schema_extra = { "linkml_meta": {'alias': 'library_ID',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_selection: str = Field(default=..., description="""Method of selection of library source material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_selection',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: str = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    max: float = Field(default=..., description="""Maximum read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'max',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    mean: float = Field(default=..., description="""Mean read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'mean',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    min: float = Field(default=..., description="""Minimum read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'min',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    n25: int = Field(default=..., description="""Read length where 25% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n25',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    n50: int = Field(default=..., description="""Read length where 50% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n50',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'OntSequencingData']} })
    n75: int = Field(default=..., description="""Read length where 75% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n75',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: str = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    polymerase_version: str = Field(default=..., description="""Version of the polymerase used in HiFi sequencing.""", json_schema_extra = { "linkml_meta": {'alias': 'polymerase_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    quartile_25: int = Field(default=..., description="""25th percentile of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_25',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    quartile_50: int = Field(default=..., description="""50th percentile (median) of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_50',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    quartile_75: int = Field(default=..., description="""75th percentile of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_75',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    seq_plate_chemistry_version: str = Field(default=..., description="""Version of PacBio sequencing plate chemistry used for HiFi data.""", json_schema_extra = { "linkml_meta": {'alias': 'seq_plate_chemistry_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    shear_method: str = Field(default=..., description="""Approach to initial DNA fragmentation.""", json_schema_extra = { "linkml_meta": {'alias': 'shear_method',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    size_selection: str = Field(default=..., description="""Approach to final library size-selection.""", json_schema_extra = { "linkml_meta": {'alias': 'size_selection',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    study: str = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    title: str = Field(default=..., description="""Title or name of the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'title',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    total_bp: int = Field(default=..., description="""Total number of base pairs in the file.""", json_schema_extra = { "linkml_meta": {'alias': 'total_bp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData']} })
    total_gbp: Optional[float] = Field(default=None, description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })


class HiFiSequencingData(SequencingData):
    """
    A HiFi sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: str = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: str = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: str = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    ccs_algorithm: str = Field(default=..., description="""Version of consensus sequence generation algorithm.""", json_schema_extra = { "linkml_meta": {'alias': 'ccs_algorithm',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    coverage: float = Field(default=..., description="""Estimated coverage depth of the genome.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    data_type: str = Field(default=..., description="""Content of data file.""", json_schema_extra = { "linkml_meta": {'alias': 'data_type',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    deepconsensus_coverage: Optional[float] = Field(default=None, description="""Coverage depth after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_coverage', 'domain_of': ['HiFiSequencingData']} })
    deepconsensus_filename: str = Field(default=..., description="""Filename of the DeepConsensus output file.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_filename', 'domain_of': ['HiFiSequencingData']} })
    deepconsensus_path: str = Field(default=..., description="""File path to the DeepConsensus output.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_path', 'domain_of': ['HiFiSequencingData']} })
    deepconsensus_version: str = Field(default=..., description="""Version of DeepConsensus software used for rebasecalling HiFi data.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_version',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    design_description: str = Field(default=..., description="""Brief description of materials and methods.""", json_schema_extra = { "linkml_meta": {'alias': 'design_description',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: str = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: str = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_ID: str = Field(default=..., description="""Short identifier for library ID.""", json_schema_extra = { "linkml_meta": {'alias': 'library_ID',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_selection: str = Field(default=..., description="""Method of selection of library source material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_selection',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: str = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    lima_float_version: str = Field(default=..., description="""Detailed version number of the Lima adapter trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'lima_float_version', 'domain_of': ['HiFiSequencingData']} })
    lima_version: str = Field(default=..., description="""Version of the Lima adapter trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'lima_version',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    max: float = Field(default=..., description="""Maximum read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'max',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    mean: float = Field(default=..., description="""Mean read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'mean',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    min: float = Field(default=..., description="""Minimum read length in the HiFi dataset after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'min',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    mm_remove: bool = Field(default=..., description="""Whether methylation tags were removed from the data.""", json_schema_extra = { "linkml_meta": {'alias': 'mm_remove', 'domain_of': ['HiFiSequencingData']} })
    mm_tag: bool = Field(default=..., description="""Whether the data contains methylation (MM) tags.""", json_schema_extra = { "linkml_meta": {'alias': 'mm_tag', 'domain_of': ['HiFiSequencingData']} })
    n25: int = Field(default=..., description="""Read length where 25% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n25',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    n50: int = Field(default=..., description="""Read length where 50% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n50',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'OntSequencingData']} })
    n75: int = Field(default=..., description="""Read length where 75% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n75',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    notes: str = Field(default=..., description="""Free text used to flag major issues.""", json_schema_extra = { "linkml_meta": {'alias': 'notes', 'domain_of': ['HiFiSequencingData']} })
    ntsm_score: Optional[float] = Field(default=None, description="""Normalized Trans-Scaffold Mappability score.""", json_schema_extra = { "linkml_meta": {'alias': 'ntsm_score',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: str = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    polymerase_version: str = Field(default=..., description="""Version of the polymerase used in HiFi sequencing.""", json_schema_extra = { "linkml_meta": {'alias': 'polymerase_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    primrose_filename: str = Field(default=..., description="""Filename of the Primrose basecalling output (if used).""", json_schema_extra = { "linkml_meta": {'alias': 'primrose_filename', 'domain_of': ['HiFiSequencingData']} })
    production: str = Field(default=..., description="""Name of original data submisson.""", json_schema_extra = { "linkml_meta": {'alias': 'production',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    quartile_25: int = Field(default=..., description="""25th percentile of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_25',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    quartile_50: int = Field(default=..., description="""50th percentile (median) of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_50',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    quartile_75: int = Field(default=..., description="""75th percentile of HiFi read lengths after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'quartile_75',
         'domain_of': ['DeepConsensusSequencingData', 'HiFiSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    seq_plate_chemistry_version: str = Field(default=..., description="""Version of PacBio sequencing plate chemistry used for HiFi data.""", json_schema_extra = { "linkml_meta": {'alias': 'seq_plate_chemistry_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    shear_method: str = Field(default=..., description="""Approach to initial DNA fragmentation.""", json_schema_extra = { "linkml_meta": {'alias': 'shear_method',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    size_selection: str = Field(default=..., description="""Approach to final library size-selection.""", json_schema_extra = { "linkml_meta": {'alias': 'size_selection',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    study: str = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    title: str = Field(default=..., description="""Title or name of the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'title',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    total_bp: int = Field(default=..., description="""Total number of base pairs in the file.""", json_schema_extra = { "linkml_meta": {'alias': 'total_bp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData']} })
    total_gbp: Optional[float] = Field(default=None, description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })


class IlluminaSequencingData(SequencingData):
    """
    An Illumina sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    coverage: float = Field(default=..., description="""Estimated coverage depth of the genome.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    family_id: str = Field(default=..., description="""Identifier for the family group.""", json_schema_extra = { "linkml_meta": {'alias': 'family_id', 'domain_of': ['IlluminaSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    gender: str = Field(default=..., description="""Gender/sex of the individual.""", json_schema_extra = { "linkml_meta": {'alias': 'gender', 'domain_of': ['IlluminaSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_construction_protocol: str = Field(default=..., description="""Protocol used to construct the sequencing library.""", json_schema_extra = { "linkml_meta": {'alias': 'library_construction_protocol',
         'domain_of': ['IlluminaSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    maternal_id: str = Field(default=..., description="""Sample ID of the individual's mother.""", json_schema_extra = { "linkml_meta": {'alias': 'maternal_id', 'domain_of': ['IlluminaSequencingData']} })
    other_comments: str = Field(default=..., description="""Additional notes or comments about the sample.""", json_schema_extra = { "linkml_meta": {'alias': 'other_comments', 'domain_of': ['IlluminaSequencingData']} })
    paternal_id: str = Field(default=..., description="""Sample ID of the individual's father.""", json_schema_extra = { "linkml_meta": {'alias': 'paternal_id', 'domain_of': ['IlluminaSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    phasing: str = Field(default=..., description="""Information about haplotype phasing status.""", json_schema_extra = { "linkml_meta": {'alias': 'phasing', 'domain_of': ['IlluminaSequencingData']} })
    population: str = Field(default=..., description="""Population group the individual belongs to.""", json_schema_extra = { "linkml_meta": {'alias': 'population', 'domain_of': ['IlluminaSequencingData']} })
    read_length: int = Field(default=..., description="""Length of the sequencing reads in base pairs.""", json_schema_extra = { "linkml_meta": {'alias': 'read_length', 'domain_of': ['IlluminaSequencingData']} })
    relationship: str = Field(default=..., description="""Relationship to other samples in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'relationship', 'domain_of': ['IlluminaSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    second_order: str = Field(default=..., description="""Second-order relatives in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'second_order', 'domain_of': ['IlluminaSequencingData']} })
    siblings: str = Field(default=..., description="""Sample IDs of siblings.""", json_schema_extra = { "linkml_meta": {'alias': 'siblings', 'domain_of': ['IlluminaSequencingData']} })
    third_order: str = Field(default=..., description="""Third-order relatives in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'third_order', 'domain_of': ['IlluminaSequencingData']} })
    total_bp: int = Field(default=..., description="""Total number of base pairs in the file.""", json_schema_extra = { "linkml_meta": {'alias': 'total_bp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData']} })
    total_gbp: Optional[float] = Field(default=None, description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })


class KinnexSequencingData(SequencingData):
    """
    A Kinnex sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: str = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    barcode: str = Field(default=..., description="""Unique barcode identifier used for multiplexing samples.""", json_schema_extra = { "linkml_meta": {'alias': 'barcode', 'domain_of': ['KinnexSequencingData']} })
    basecaller_version: str = Field(default=..., description="""Version of the basecalling software used.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_version',
         'domain_of': ['KinnexSequencingData', 'OntSequencingData']} })
    bioproject_accession: str = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: str = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    ccs_algorithm: str = Field(default=..., description="""Version of consensus sequence generation algorithm.""", json_schema_extra = { "linkml_meta": {'alias': 'ccs_algorithm',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    cell_type: str = Field(default=..., description="""Type of cell used in the PacBio instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'cell_type', 'domain_of': ['KinnexSequencingData']} })
    check_flnc_reads: int = Field(default=..., description="""Count of full-length non-chimeric reads passing quality checks.""", json_schema_extra = { "linkml_meta": {'alias': 'check_flnc_reads', 'domain_of': ['KinnexSequencingData']} })
    data_type: str = Field(default=..., description="""Content of data file.""", json_schema_extra = { "linkml_meta": {'alias': 'data_type',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    design_description: str = Field(default=..., description="""Brief description of materials and methods.""", json_schema_extra = { "linkml_meta": {'alias': 'design_description',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: str = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: str = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    iso_filename: str = Field(default=..., description="""Name of the file containing isoform data.""", json_schema_extra = { "linkml_meta": {'alias': 'iso_filename', 'domain_of': ['KinnexSequencingData']} })
    iso_library_id: str = Field(default=..., description="""Identifier for the Iso-Seq library.""", json_schema_extra = { "linkml_meta": {'alias': 'iso_library_id', 'domain_of': ['KinnexSequencingData']} })
    jasmine_version: str = Field(default=..., description="""Version of the Jasmine software used for isoform analysis.""", json_schema_extra = { "linkml_meta": {'alias': 'jasmine_version', 'domain_of': ['KinnexSequencingData']} })
    library_ID: str = Field(default=..., description="""Short identifier for library ID.""", json_schema_extra = { "linkml_meta": {'alias': 'library_ID',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_selection: str = Field(default=..., description="""Method of selection of library source material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_selection',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: str = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    lima_version: str = Field(default=..., description="""Version of the Lima adapter trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'lima_version',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    ntsm_score: Optional[float] = Field(default=None, description="""Normalized Trans-Scaffold Mappability score.""", json_schema_extra = { "linkml_meta": {'alias': 'ntsm_score',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    pbtrim_version: str = Field(default=..., description="""Version of the PacBio trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'pbtrim_version', 'domain_of': ['KinnexSequencingData']} })
    platform: str = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform_unit_1: str = Field(default=..., description="""First component of the platform identifier.""", json_schema_extra = { "linkml_meta": {'alias': 'platform_unit_1', 'domain_of': ['KinnexSequencingData']} })
    platform_unit_2: str = Field(default=..., description="""Second component of the platform identifier.""", json_schema_extra = { "linkml_meta": {'alias': 'platform_unit_2', 'domain_of': ['KinnexSequencingData']} })
    polymerase_version: str = Field(default=..., description="""Version of the polymerase used in HiFi sequencing.""", json_schema_extra = { "linkml_meta": {'alias': 'polymerase_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    pool: str = Field(default=..., description="""Pool identifier for multiplexed samples.""", json_schema_extra = { "linkml_meta": {'alias': 'pool', 'domain_of': ['KinnexSequencingData']} })
    production: str = Field(default=..., description="""Name of original data submisson.""", json_schema_extra = { "linkml_meta": {'alias': 'production',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    refine_version: str = Field(default=..., description="""Version of the PacBio Refine software.""", json_schema_extra = { "linkml_meta": {'alias': 'refine_version', 'domain_of': ['KinnexSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    seq_plate_chemistry_version: str = Field(default=..., description="""Version of PacBio sequencing plate chemistry used for HiFi data.""", json_schema_extra = { "linkml_meta": {'alias': 'seq_plate_chemistry_version',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    shear_method: str = Field(default=..., description="""Approach to initial DNA fragmentation.""", json_schema_extra = { "linkml_meta": {'alias': 'shear_method',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    similarity: float = Field(default=..., description="""Similarity metric for sequence alignment or clustering.""", json_schema_extra = { "linkml_meta": {'alias': 'similarity', 'domain_of': ['KinnexSequencingData']} })
    size_selection: str = Field(default=..., description="""Approach to final library size-selection.""", json_schema_extra = { "linkml_meta": {'alias': 'size_selection',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    study: str = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    title: str = Field(default=..., description="""Title or name of the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'title',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })


class OntSequencingData(SequencingData):
    """
    An ONT sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    coverage_100kb_plus: float = Field(default=..., description="""Coverage from reads 100kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_100kb_plus', 'domain_of': ['OntSequencingData']} })
    coverage_1Mb_plus: float = Field(default=..., description="""Coverage from reads 1 megabase or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_1Mb_plus', 'domain_of': ['OntSequencingData']} })
    coverage_200kb_plus: float = Field(default=..., description="""Coverage from reads 200kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_200kb_plus', 'domain_of': ['OntSequencingData']} })
    coverage_300kb_plus: float = Field(default=..., description="""Coverage from reads 300kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_300kb_plus', 'domain_of': ['OntSequencingData']} })
    coverage_400kb_plus: float = Field(default=..., description="""Coverage from reads 400kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_400kb_plus', 'domain_of': ['OntSequencingData']} })
    coverage_500kb_plus: float = Field(default=..., description="""Coverage from reads 500kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_500kb_plus', 'domain_of': ['OntSequencingData']} })
    accession: str = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    basecaller: str = Field(default=..., description="""Software used for basecalling ONT signal data.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller', 'domain_of': ['OntSequencingData']} })
    basecaller_model: str = Field(default=..., description="""Specific model used by the basecaller.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_model', 'domain_of': ['OntSequencingData']} })
    basecaller_version: str = Field(default=..., description="""Version of the basecalling software used.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_version',
         'domain_of': ['KinnexSequencingData', 'OntSequencingData']} })
    bioproject_accession: str = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: str = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    coverage: float = Field(default=..., description="""Estimated coverage depth of the genome.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    data_type: str = Field(default=..., description="""Content of data file.""", json_schema_extra = { "linkml_meta": {'alias': 'data_type',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    design_description: str = Field(default=..., description="""Brief description of materials and methods.""", json_schema_extra = { "linkml_meta": {'alias': 'design_description',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: str = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: str = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: str = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: str = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_ID: str = Field(default=..., description="""Short identifier for library ID.""", json_schema_extra = { "linkml_meta": {'alias': 'library_ID',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_layout: str = Field(default=..., description="""Format of sequence reads.""", json_schema_extra = { "linkml_meta": {'alias': 'library_layout',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_selection: str = Field(default=..., description="""Method of selection of library source material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_selection',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: str = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: str = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    n50: int = Field(default=..., description="""Read length where 50% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n50',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'OntSequencingData']} })
    ntsm_score: Optional[float] = Field(default=None, description="""Normalized Trans-Scaffold Mappability score.""", json_schema_extra = { "linkml_meta": {'alias': 'ntsm_score',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: str = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    production: str = Field(default=..., description="""Name of original data submisson.""", json_schema_extra = { "linkml_meta": {'alias': 'production',
         'domain_of': ['HiCSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    seq_kit: str = Field(default=..., description="""Sequencing kit used for library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'seq_kit', 'domain_of': ['OntSequencingData']} })
    sequencing_chemistry: str = Field(default=..., description="""Chemistry version used for ONT sequencing.""", json_schema_extra = { "linkml_meta": {'alias': 'sequencing_chemistry', 'domain_of': ['OntSequencingData']} })
    shear_method: str = Field(default=..., description="""Approach to initial DNA fragmentation.""", json_schema_extra = { "linkml_meta": {'alias': 'shear_method',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    size_selection: str = Field(default=..., description="""Approach to final library size-selection.""", json_schema_extra = { "linkml_meta": {'alias': 'size_selection',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    study: str = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_gbp: Optional[float] = Field(default=None, description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    whales: int = Field(default=..., description="""Count of exceptionally long reads (typically >1Mb).""", json_schema_extra = { "linkml_meta": {'alias': 'whales', 'domain_of': ['OntSequencingData']} })


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
SequencingData.model_rebuild()
HiCSequencingData.model_rebuild()
DeepConsensusSequencingData.model_rebuild()
HiFiSequencingData.model_rebuild()
IlluminaSequencingData.model_rebuild()
KinnexSequencingData.model_rebuild()
OntSequencingData.model_rebuild()

