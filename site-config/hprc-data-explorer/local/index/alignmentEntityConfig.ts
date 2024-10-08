import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerAlignment } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getAlignmentId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /alignments route.
 */
export const alignmentEntityConfig: EntityConfig<HPRCDataExplorerAlignment> = {
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
    key: "alignments",
  },
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  explorerTitle: "Alignments",
  getId: getAlignmentId,
  label: "Alignments",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFilename,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
        width: { max: "1.5fr", min: "212px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPipeline,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PIPELINE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PIPELINE,
        width: { max: "1fr", min: "140px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildReferenceCoordinates,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE_COORDINATES,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE_COORDINATES,
        width: { max: "1fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.NTagCell,
          viewBuilder: V.buildUseCase,
        } as ComponentConfig<typeof C.NTagCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.USE_CASE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.USE_CASE,
        width: { max: "1.2fr", min: "160px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildLoc,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAlignment
        >,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.LOC,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.LOC,
        width: { max: "0.8fr", min: "112px" },
      },
    ],
    defaultSort: {
      desc: SORT_DIRECTION.ASCENDING,
      id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
    },
  } as ListConfig<HPRCDataExplorerAlignment>,
  listView: {
    disablePagination: true,
    enableDownload: true,
    enableTab: false,
  },
  route: "alignments",
  staticLoadFile: "files/out/alignments.json",
};
