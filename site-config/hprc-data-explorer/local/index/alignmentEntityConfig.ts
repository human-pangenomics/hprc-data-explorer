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
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ALIGNMENT,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ALIGNMENT,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.VERSION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.VERSION,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.USE_CASE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.USE_CASE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PIPELINE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PIPELINE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE_COORDINATES,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE_COORDINATES,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
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
          component: C.FileDownload,
          viewBuilder: V.buildAlignmentDownload,
        } as ComponentConfig<typeof C.FileDownload, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ALIGNMENT_DOWNLOAD,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ALIGNMENT_DOWNLOAD,
        width: { max: "auto", min: "76px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAlignment,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ALIGNMENT,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ALIGNMENT,
        width: { max: "1fr", min: "112px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildVersion,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.VERSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.VERSION,
        width: { max: "0.5fr", min: "112px" },
      },
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
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAlignment>,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILE_SIZE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILE_SIZE,
        width: { max: "0.5fr", min: "112px" },
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
    ],
    defaultSort: {
      desc: SORT_DIRECTION.DESCENDING,
      id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ALIGNMENT,
    },
  } as ListConfig<HPRCDataExplorerAlignment>,
  listView: {
    disablePagination: true,
    enableDownload: true,
    enableTab: false,
  },
  route: "alignments",
  staticLoadFile: "catalog/alignments.json",
};
