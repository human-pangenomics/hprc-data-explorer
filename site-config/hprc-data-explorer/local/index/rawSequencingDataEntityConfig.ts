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
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.DATA_TYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DATA_TYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.DESIGN_DESCRIPTION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DESIGN_DESCRIPTION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENERATOR_CONTACT,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENERATOR_CONTACT,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENERATOR_FACILITY,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENERATOR_FACILITY,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.INSTRUMENT_MODEL,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.INSTRUMENT_MODEL,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_LAYOUT,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_LAYOUT,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_SELECTION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_SELECTION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_SOURCE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_SOURCE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.LIBRARY_STRATEGY,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LIBRARY_STRATEGY,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.NOTES,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.NOTES,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PATH,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PATH,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PLATFORM,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PLATFORM,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SHEAR_METHOD,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SHEAR_METHOD,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SIZE_SELECTION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SIZE_SELECTION,
            },
          ],
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
    label: "Raw Sequencing Data",
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
            viewBuilder: V.buildPath,
          } as ComponentConfig<
            typeof C.BasicCell,
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
