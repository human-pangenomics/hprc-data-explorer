import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerRawSequencingData } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getRawSequencingDataId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /raw-sequencing-data route.
 */
export const rawSequencingDataEntityConfig: EntityConfig<HPRCDataExplorerRawSequencingData> =
  {
    categoryGroupConfig: {
      categoryGroups: [
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.METADATA_ACCESSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.METADATA_ACCESSION,
            },
          ],
          label: "Accession",
        },
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SUPERPOPULATION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SUPERPOPULATION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SUBPOPULATION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SUBPOPULATION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PRODUCTION_YEAR,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PRODUCTION_YEAR,
            },
          ],
          label: "Sample",
        },
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PLATFORM,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PLATFORM,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.INSTRUMENT_MODEL,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.INSTRUMENT_MODEL,
            },

            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.DESIGN_DESCRIPTION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DESIGN_DESCRIPTION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_STRATEGY,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_STRATEGY,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.DATA_TYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DATA_TYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILETYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILETYPE,
            },
          ],
          label: "Sequencing",
        },
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SHEAR_METHOD,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SHEAR_METHOD,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SIZE_SELECTION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SIZE_SELECTION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.DEEPCONSENSUS_VERSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DEEPCONSENSUS_VERSION,
            },
          ],
          label: "Sequencing - PacBio",
        },
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER_VERSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER_VERSION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ONE_HUNDRED_KB_PLUS,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ONE_HUNDRED_KB_PLUS,
            },
          ],
          label: "Sequencing - ONT",
        },
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.COVERAGE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.COVERAGE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_GBP,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_GBP,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.N50,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.N50,
            },
          ],
          label: "Quality",
        },
      ],
      key: "raw-sequencing-data",
    },
    detail: {
      detailOverviews: [],
      staticLoad: false,
      tabs: [],
      top: [],
    },
    exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
    explorerTitle: "Sequencing Data",
    getId: getRawSequencingDataId,
    label: "Sequencing Data",
    list: {
      columns: [
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFilename,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
          width: { max: "1.5fr", min: "212px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSampleId,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFamilyId,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: true,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSuperpopulation,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SUPERPOPULATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SUPERPOPULATION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: true,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSubpopulation,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SUBPOPULATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SUBPOPULATION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildAccession,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildMetadataAccession,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.METADATA_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.METADATA_ACCESSION,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPlatform,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PLATFORM,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PLATFORM,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildInstrumentModel,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.INSTRUMENT_MODEL,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.INSTRUMENT_MODEL,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildAssembly,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBasecaller,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBasecallerModel,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER_MODEL,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER_MODEL,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBasecallerVersion,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER_VERSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER_VERSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBioprojectAccession,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOPROJECT_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOPROJECT_ACCESSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBiosampleAccession,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildCcsAlgorithm,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CCS_ALGORITHM,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.CCS_ALGORITHM,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildCoverage,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.COVERAGE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.COVERAGE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildDataType,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DATA_TYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.DATA_TYPE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildDeepConsensusVersion,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DEEPCONSENSUS_VERSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.DEEPCONSENSUS_VERSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildDesignDescription,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DESIGN_DESCRIPTION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.DESIGN_DESCRIPTION,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFiletype,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILETYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILETYPE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFiveHundredkbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FIVE_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FIVE_HUNDRED_KB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFourHundredkbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FOUR_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FOUR_HUNDRED_KB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildGb,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GB,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.GB,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildGeneratorContact,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENERATOR_CONTACT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENERATOR_CONTACT,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildGeneratorFacility,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENERATOR_FACILITY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENERATOR_FACILITY,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildLibraryId,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_ID,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildLibraryLayout,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_LAYOUT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_LAYOUT,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildLibrarySelection,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_SELECTION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_SELECTION,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildLibrarySource,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_SOURCE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_SOURCE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildLibraryStrategy,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_STRATEGY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_STRATEGY,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildMax,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MAX,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MAX,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildMean,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MEAN,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MEAN,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildMin,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MIN,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MIN,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildMmTag,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MM_TAG,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MM_TAG,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildN25,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.N25,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.N25,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildN50,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.N50,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.N50,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildN75,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.N75,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.N75,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildNotes,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.NOTES,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.NOTES,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildNtsmResult,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.NTSM_RESULT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.NTSM_RESULT,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildNtsmScore,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.NTSM_SCORE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.NTSM_SCORE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildOneHundredkbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ONE_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ONE_HUNDRED_KB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildOneMbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ONE_MB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ONE_MB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: true,
          componentConfig: {
            component: C.TypographyNoWrap,
            viewBuilder: V.buildPath,
          } as ComponentConfig<
            typeof C.TypographyNoWrap,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PATH,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PATH,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPolymeraseVersion,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POLYMERASE_VERSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POLYMERASE_VERSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildProductionYear,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PRODUCTION_YEAR,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PRODUCTION_YEAR,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            columnVisible: false,
            component: C.BasicCell,
            viewBuilder: V.buildQuartile25,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.QUARTILE_25,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.QUARTILE_25,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildQuartile50,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.QUARTILE_50,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.QUARTILE_50,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildQuartile75,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.QUARTILE_75,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.QUARTILE_75,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildReadN50,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.READ_N50,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.READ_N50,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildResult,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.RESULT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.RESULT,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSeqKit,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SEQ_KIT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SEQ_KIT,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSeqPlateChemistryVersion,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SEQ_PLATE_CHEMISTRY_VERSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SEQ_PLATE_CHEMISTRY_VERSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildShearMethod,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SHEAR_METHOD,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SHEAR_METHOD,
          width: { max: "0.5fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSizeSelection,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SIZE_SELECTION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SIZE_SELECTION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildStudy,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.STUDY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.STUDY,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildThreeHundredkbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.THREE_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.THREE_HUNDRED_KB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildTitle,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TITLE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TITLE,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildTotalBp,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_BP,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_BP,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildTotalGbp,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_GBP,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_GBP,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildTotalReads,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_READS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_READS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildTwoHundredkbPlus,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TWO_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TWO_HUNDRED_KB_PLUS,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildWhales,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.WHALES,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.WHALES,
          width: { max: "0.5fr", min: "112px" },
        },
      ],
      defaultSort: {
        desc: SORT_DIRECTION.ASCENDING,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
      },
    } as ListConfig<HPRCDataExplorerRawSequencingData>,
    listView: {
      disablePagination: true,
      enableDownload: true,
      enableTab: false,
    },
    route: "raw-sequencing-data",
    staticLoadFile: "files/out/raw-sequencing-data.json",
  };
