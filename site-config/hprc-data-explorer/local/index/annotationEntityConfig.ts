import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerAnnotation } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getAnnotationId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /annotations route.
 */
export const annotationEntityConfig: EntityConfig<HPRCDataExplorerAnnotation> =
  {
    categoryGroupConfig: {
      categoryGroups: [
        {
          categoryConfigs: [
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ANNOTATION_TYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ANNOTATION_TYPE,
            },
          ],
        },
      ],
      key: "annotations",
    },
    detail: {
      detailOverviews: [],
      staticLoad: false,
      tabs: [],
      top: [],
    },
    exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
    explorerTitle: "Annotations",
    getId: getAnnotationId,
    label: "Annotations",
    list: {
      columns: [
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildSampleId,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
          width: { max: "0.5fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildHaplotype,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildReference,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.REFERENCE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.REFERENCE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildAnnotationType,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ANNOTATION_TYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ANNOTATION_TYPE,
          width: { max: "1fr", min: "160px" },
        },
        {
          columnVisible: true,
          componentConfig: {
            component: C.TypographyNoWrap,
            viewBuilder: V.buildFileLocation,
          } as ComponentConfig<
            typeof C.TypographyNoWrap,
            HPRCDataExplorerAnnotation
          >,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILE_LOCATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILE_LOCATION,
          width: { max: "1fr", min: "112px" },
        },
      ],
      defaultSort: {
        desc: SORT_DIRECTION.ASCENDING,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
      },
    } as ListConfig<HPRCDataExplorerAnnotation>,
    listView: {
      disablePagination: true,
      enableDownload: true,
      enableTab: false,
    },
    route: "annotations",
    staticLoadFile: "catalog/annotations.json",
  };
