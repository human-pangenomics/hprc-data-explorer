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


linkml_meta = LinkMLMeta({'default_prefix': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#',
     'description': 'Schema for source sequencing data.',
     'id': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#',
     'imports': ['linkml:types'],
     'name': 'sequencing_data',
     'prefixes': {'linkml': {'prefix_prefix': 'linkml',
                             'prefix_reference': 'https://w3id.org/linkml/'}},
     'source_file': './catalog/schema/sequencing_data.yaml'} )

class FileType(str, Enum):
    fastq = "fastq"
    fast5 = "fast5"
    tar = "tar"
    bam = "bam"
    cram = "cram"


class InstrumentModel(str, Enum):
    PacBio_Sequel_II = "PacBio Sequel II"
    PromethION = "PromethION"
    NextSeq_500 = "NextSeq 500"
    NextSeq_550 = "NextSeq 550"
    Illumina_NovaSeq_6000 = "Illumina NovaSeq 6000"
    GridION = "GridION"
    MinION = "MinION"
    Revio = "Revio"
    Sequel_II = "Sequel II"


class LibrarySource(str, Enum):
    GENOMIC = "GENOMIC"
    transcriptomic = "transcriptomic"


class LibraryStrategy(str, Enum):
    Hi_C = "Hi-C"
    isoseq = "isoseq"
    WGS = "WGS"
    OTHER = "OTHER"


class Platform(str, Enum):
    ILLUMINA = "ILLUMINA"
    PACBIO_SMRT = "PACBIO_SMRT"
    OXFORD_NANOPORE = "OXFORD_NANOPORE"



class SequencingData(ConfiguredBaseModel):
    """
    A sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'abstract': True,
         'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
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

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class HiCSequencingData(SequencingData):
    """
    A HiC sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: Optional[str] = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: Optional[str] = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: Optional[str] = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
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
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: Optional[str] = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: Optional[str] = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: LibrarySource = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
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
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
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
    study: Optional[str] = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_gbp: float = Field(default=..., description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class DeepConsensusSequencingData(SequencingData):
    """
    A DeepConsensus sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: Optional[str] = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: Optional[str] = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: Optional[str] = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
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
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: Optional[str] = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: Optional[str] = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: LibrarySource = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
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
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
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
    study: Optional[str] = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_gbp: float = Field(default=..., description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class HiFiSequencingData(SequencingData):
    """
    A HiFi sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: Optional[str] = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: Optional[str] = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: Optional[str] = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
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
    deepconsensus_coverage: Optional[float] = Field(default=..., description="""Coverage depth after DeepConsensus processing.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_coverage', 'domain_of': ['HiFiSequencingData']} })
    deepconsensus_filename: Optional[str] = Field(default=..., description="""Filename of the DeepConsensus output file.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_filename', 'domain_of': ['HiFiSequencingData']} })
    deepconsensus_path: Optional[str] = Field(default=..., description="""File path to the DeepConsensus output.""", json_schema_extra = { "linkml_meta": {'alias': 'deepconsensus_path', 'domain_of': ['HiFiSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: Optional[str] = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: Optional[str] = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: LibrarySource = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    lima_version: Optional[str] = Field(default=..., description="""Version of the Lima adapter trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'lima_version',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    mm_tag: bool = Field(default=..., description="""Whether the data contains methylation (MM) tags.""", json_schema_extra = { "linkml_meta": {'alias': 'mm_tag', 'domain_of': ['HiFiSequencingData']} })
    n50: int = Field(default=..., description="""Read length where 50% of bases in the HiFi dataset are in reads of this length or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'n50',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'OntSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    primrose_filename: Optional[str] = Field(default=..., description="""Filename of the Primrose basecalling output (if used).""", json_schema_extra = { "linkml_meta": {'alias': 'primrose_filename', 'domain_of': ['HiFiSequencingData']} })
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
    study: Optional[str] = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_gbp: float = Field(default=..., description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class IlluminaSequencingData(SequencingData):
    """
    An Illumina sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#',
         'slot_usage': {'basecaller': {'name': 'basecaller', 'required': False},
                        'basecaller_version': {'name': 'basecaller_version',
                                               'required': False}}})

    basecaller: Optional[str] = Field(default=..., description="""Software used for basecalling ONT signal data.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    basecaller_version: Optional[str] = Field(default=..., description="""Version of the basecalling software used.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_version',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
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
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    gender: str = Field(default=..., description="""Gender/sex of the individual.""", json_schema_extra = { "linkml_meta": {'alias': 'gender', 'domain_of': ['IlluminaSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    maternal_id: Optional[str] = Field(default=..., description="""Sample ID of the individual's mother.""", json_schema_extra = { "linkml_meta": {'alias': 'maternal_id', 'domain_of': ['IlluminaSequencingData']} })
    other_comments: Optional[str] = Field(default=..., description="""Additional notes or comments about the sample.""", json_schema_extra = { "linkml_meta": {'alias': 'other_comments', 'domain_of': ['IlluminaSequencingData']} })
    paternal_id: Optional[str] = Field(default=..., description="""Sample ID of the individual's father.""", json_schema_extra = { "linkml_meta": {'alias': 'paternal_id', 'domain_of': ['IlluminaSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    phasing: str = Field(default=..., description="""Information about haplotype phasing status.""", json_schema_extra = { "linkml_meta": {'alias': 'phasing', 'domain_of': ['IlluminaSequencingData']} })
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    relationship: str = Field(default=..., description="""Relationship to other samples in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'relationship', 'domain_of': ['IlluminaSequencingData']} })
    sample_id: str = Field(default=..., description="""Identifier from 1000G/HapMap (as found in Coriell for DNA).""", json_schema_extra = { "linkml_meta": {'alias': 'sample_id',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    second_order: Optional[str] = Field(default=..., description="""Second-order relatives in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'second_order', 'domain_of': ['IlluminaSequencingData']} })
    siblings: Optional[str] = Field(default=..., description="""Sample IDs of siblings.""", json_schema_extra = { "linkml_meta": {'alias': 'siblings', 'domain_of': ['IlluminaSequencingData']} })
    third_order: Optional[str] = Field(default=..., description="""Third-order relatives in the dataset.""", json_schema_extra = { "linkml_meta": {'alias': 'third_order', 'domain_of': ['IlluminaSequencingData']} })
    total_gbp: float = Field(default=..., description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class KinnexSequencingData(SequencingData):
    """
    A Kinnex sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    accession: Optional[str] = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    barcode: str = Field(default=..., description="""Unique barcode identifier used for multiplexing samples.""", json_schema_extra = { "linkml_meta": {'alias': 'barcode', 'domain_of': ['KinnexSequencingData']} })
    basecaller: str = Field(default=..., description="""Software used for basecalling ONT signal data.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    basecaller_version: str = Field(default=..., description="""Version of the basecalling software used.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_version',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: Optional[str] = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: Optional[str] = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    ccs_algorithm: str = Field(default=..., description="""Version of consensus sequence generation algorithm.""", json_schema_extra = { "linkml_meta": {'alias': 'ccs_algorithm',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: Optional[str] = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: Optional[str] = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    iso_filename: str = Field(default=..., description="""Name of the file containing isoform data.""", json_schema_extra = { "linkml_meta": {'alias': 'iso_filename', 'domain_of': ['KinnexSequencingData']} })
    library_source: LibrarySource = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    lima_version: Optional[str] = Field(default=..., description="""Version of the Lima adapter trimming software.""", json_schema_extra = { "linkml_meta": {'alias': 'lima_version',
         'domain_of': ['HiFiSequencingData', 'KinnexSequencingData']} })
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform_unit_1: str = Field(default=..., description="""First component of the platform identifier.""", json_schema_extra = { "linkml_meta": {'alias': 'platform_unit_1', 'domain_of': ['KinnexSequencingData']} })
    platform_unit_2: str = Field(default=..., description="""Second component of the platform identifier.""", json_schema_extra = { "linkml_meta": {'alias': 'platform_unit_2', 'domain_of': ['KinnexSequencingData']} })
    pool: str = Field(default=..., description="""Pool identifier for multiplexed samples.""", json_schema_extra = { "linkml_meta": {'alias': 'pool', 'domain_of': ['KinnexSequencingData']} })
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
    study: Optional[str] = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_reads: int = Field(default=..., description="""Total number of reads.""", json_schema_extra = { "linkml_meta": {'alias': 'total_reads',
         'domain_of': ['DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


class OntSequencingData(SequencingData):
    """
    An ONT sequencing data file.
    """
    linkml_meta: ClassVar[LinkMLMeta] = LinkMLMeta({'from_schema': 'https://github.com/human-pangenomics/hprc-data-explorer/blob/main/catalog/schema/sequencing_data.yaml#'})

    coverage_over_100kb: float = Field(default=..., description="""Coverage from reads 100kb or longer.""", json_schema_extra = { "linkml_meta": {'alias': 'coverage_over_100kb', 'domain_of': ['OntSequencingData']} })
    accession: Optional[str] = Field(default=..., description="""Database accession number of data entity (e.g. SRR or ERR identifier).""", json_schema_extra = { "linkml_meta": {'alias': 'accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    basecaller: str = Field(default=..., description="""Software used for basecalling ONT signal data.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    basecaller_model: str = Field(default=..., description="""Specific model used by the basecaller.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_model', 'domain_of': ['OntSequencingData']} })
    basecaller_version: str = Field(default=..., description="""Version of the basecalling software used.""", json_schema_extra = { "linkml_meta": {'alias': 'basecaller_version',
         'domain_of': ['IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    bioproject_accession: Optional[str] = Field(default=..., description="""NCBI BioProject accession.""", json_schema_extra = { "linkml_meta": {'alias': 'bioproject_accession',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    biosample_accession: Optional[str] = Field(default=..., description="""NCBI BioSample accession.""", json_schema_extra = { "linkml_meta": {'alias': 'biosample_accession',
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
    filename: str = Field(default=..., description="""File the metadata refers to.""", json_schema_extra = { "linkml_meta": {'alias': 'filename',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    filetype: FileType = Field(default=..., description="""Type of file uploading.""", json_schema_extra = { "linkml_meta": {'alias': 'filetype',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_contact: Optional[str] = Field(default=..., description="""Contact person for problems/inquiries about the data.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_contact',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    generator_facility: Optional[str] = Field(default=..., description="""Facility that created the sequencing reads.""", json_schema_extra = { "linkml_meta": {'alias': 'generator_facility',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    instrument_model: InstrumentModel = Field(default=..., description="""Model of instrument.""", json_schema_extra = { "linkml_meta": {'alias': 'instrument_model',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_source: LibrarySource = Field(default=..., description="""Source of sequencing/library material.""", json_schema_extra = { "linkml_meta": {'alias': 'library_source',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    library_strategy: LibraryStrategy = Field(default=..., description="""General approach to library preparation.""", json_schema_extra = { "linkml_meta": {'alias': 'library_strategy',
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
    path: str = Field(default=..., description="""File path to the data in storage system.""", json_schema_extra = { "linkml_meta": {'alias': 'path',
         'domain_of': ['SequencingData',
                       'HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    platform: Platform = Field(default=..., description="""Sequencing instrument manufacturer.""", json_schema_extra = { "linkml_meta": {'alias': 'platform',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
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
    sequencing_chemistry: str = Field(default=..., description="""Chemistry version used for ONT sequencing.""", json_schema_extra = { "linkml_meta": {'alias': 'sequencing_chemistry', 'domain_of': ['OntSequencingData']} })
    study: Optional[str] = Field(default=..., description="""Name or identifier of the study that generated the data.""", json_schema_extra = { "linkml_meta": {'alias': 'study',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'KinnexSequencingData',
                       'OntSequencingData']} })
    total_gbp: float = Field(default=..., description="""Total gigabase pairs (total_bp / 1000000000).""", json_schema_extra = { "linkml_meta": {'alias': 'total_gbp',
         'domain_of': ['HiCSequencingData',
                       'DeepConsensusSequencingData',
                       'HiFiSequencingData',
                       'IlluminaSequencingData',
                       'OntSequencingData']} })
    whales: int = Field(default=..., description="""Count of exceptionally long reads (typically >1Mb).""", json_schema_extra = { "linkml_meta": {'alias': 'whales', 'domain_of': ['OntSequencingData']} })

    @field_validator('filename')
    def pattern_filename(cls, v):
        pattern=re.compile(r"^\S+$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid filename format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid filename format: {v}")
        return v

    @field_validator('sample_id')
    def pattern_sample_id(cls, v):
        pattern=re.compile(r"^(?:NA|HG)\d{3}(?:\d{2})?$")
        if isinstance(v,list):
            for element in v:
                if isinstance(v, str) and not pattern.match(element):
                    raise ValueError(f"Invalid sample_id format: {element}")
        elif isinstance(v,str):
            if not pattern.match(v):
                raise ValueError(f"Invalid sample_id format: {v}")
        return v


# Model rebuild
# see https://pydantic-docs.helpmanual.io/usage/models/#rebuilding-a-model
SequencingData.model_rebuild()
HiCSequencingData.model_rebuild()
DeepConsensusSequencingData.model_rebuild()
HiFiSequencingData.model_rebuild()
IlluminaSequencingData.model_rebuild()
KinnexSequencingData.model_rebuild()
OntSequencingData.model_rebuild()

