import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerPangenome } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getPangenomeId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /pangenomes route.
 */
export const pangenomeEntityConfig: EntityConfig<HPRCDataExplorerPangenome> = {
  categoryGroupConfig: {
    categoryGroups: [
      {
        categoryConfigs: [
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.USE_CASE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.USE_CASE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PIPELINE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PIPELINE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE_COORDINATES,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE_COORDINATES,
          },
        ],
      },
    ],
    key: "pangenomes",
  },
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  explorerTitle: "Pangenomes",
  getId: getPangenomeId,
  label: "Pangenomes",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFilename,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerPangenome>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPipeline,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerPangenome>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PIPELINE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PIPELINE,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildReferenceCoordinates,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerPangenome>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE_COORDINATES,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE_COORDINATES,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildUseCase,
        } as ComponentConfig<typeof C.NTagCell, HPRCDataExplorerPangenome>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.USE_CASE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.USE_CASE,
        width: { max: "1fr", min: "160px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildLoc,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerPangenome>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LOC,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LOC,
        width: { max: "1.5fr", min: "212px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
    },
  } as ListConfig<HPRCDataExplorerPangenome>,
  listView: {
    disablePagination: true,
    enableDownload: true,
    enableTab: false,
  },
  route: "pangenomes",
  staticLoadFile: "files/out/pangenomes.json",
};