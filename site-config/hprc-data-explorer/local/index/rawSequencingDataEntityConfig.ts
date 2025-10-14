import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
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
              enableChartView: false,
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
            },
            {
              enableChartView: false,
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
            },
          ],
          label: "SRA",
        },
        {
          categoryConfigs: [
            {
              enableChartView: false,
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
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
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_STRATEGY,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_STRATEGY,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILETYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILETYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BASECALLER_VERSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BASECALLER_VERSION,
            },
          ],
          label: "Sequencing",
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
    getId: getRawSequencingDataId,
    label: "Sequencing Data",
    list: {
      columns: [
        {
          componentConfig: {
            component: C.FileDownload,
            viewBuilder: V.buildSequencingDataDownload,
          } as ComponentConfig<
            typeof C.FileDownload,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: false,
          enableHiding: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DOWNLOAD,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.DOWNLOAD,
          width: { max: "auto", min: "76px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFilename,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
          meta: { columnPinned: true },
          width: { max: "1.5fr", min: "212px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildAccession,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFamilyId,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPopulationAbbreviation,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          columnVisible: false,
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPopulationDescriptor,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
          width: { max: "1fr", min: "160px" },
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPlatform,
          } as ComponentConfig<
            typeof C.BasicCell,
            HPRCDataExplorerRawSequencingData
          >,
          enableGrouping: true,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.INSTRUMENT_MODEL,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.INSTRUMENT_MODEL,
          width: { max: "1fr", min: "160px" },
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
          enableGrouping: true,
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
          enableGrouping: true,
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
          enableGrouping: true,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOPROJECT_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOPROJECT_ACCESSION,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CCS_ALGORITHM,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.CCS_ALGORITHM,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILETYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILETYPE,
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
          enableGrouping: true,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENERATOR_FACILITY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENERATOR_FACILITY,
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
          enableGrouping: true,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_STRATEGY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_STRATEGY,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MM_TAG,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MM_TAG,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.N50,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.N50,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ONE_HUNDRED_KB_PLUS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ONE_HUNDRED_KB_PLUS,
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
          enableGrouping: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PATH,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PATH,
          width: { max: "1fr", min: "112px" },
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.STUDY,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.STUDY,
          width: { max: "0.5fr", min: "120px" },
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_GBP,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_GBP,
          width: { max: "0.5fr", min: "144px" },
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TOTAL_READS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TOTAL_READS,
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
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.WHALES,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.WHALES,
          width: { max: "0.5fr", min: "112px" },
        },
      ],
      tableOptions: {
        enableExpanding: true,
        enableGrouping: true,
        initialState: {
          expanded: true,
          sorting: [
            {
              desc: SORT_DIRECTION.ASCENDING,
              id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
            },
          ],
        },
      },
    } as ListConfig<HPRCDataExplorerRawSequencingData>,
    listView: {
      disablePagination: true,
      enableDownload: true,
    },
    route: "raw-sequencing-data",
    staticLoadFile: "catalog/output/sequencing-data.json",
    ui: { title: "Sequencing Data" },
  };
