import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerRawSequencingData } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
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
    detail: {
      detailOverviews: [],
      staticLoad: false,
      tabs: [],
      top: [],
    },
    exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
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
          width: { max: "1fr", min: "160px" },
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
    },
    route: "raw-sequencing-data",
    staticLoadFile: "files/out/raw-sequencing-data.json",
  };
