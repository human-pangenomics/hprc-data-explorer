import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
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
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.RELEASE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ANNOTATION_TYPE,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ANNOTATION_TYPE,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
            },
            {
              key: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
              label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
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
    getId: getAnnotationId,
    label: "Annotations",
    list: {
      columns: [
        {
          componentConfig: {
            component: C.FileDownload,
            viewBuilder: V.buildAnnotationDownload,
          } as ComponentConfig<
            typeof C.FileDownload,
            HPRCDataExplorerAnnotation
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
            viewBuilder: V.buildSampleId,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
          meta: { columnPinned: true },
          width: { max: "0.5fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFilename,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFileSize,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: false,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILE_SIZE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILE_SIZE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildRelease,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.RELEASE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
          width: { max: "0.5fr", min: "80px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildHaplotype,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildAnnotationType,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ANNOTATION_TYPE,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ANNOTATION_TYPE,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.TypographyNoWrap,
            viewBuilder: V.buildFileLocation,
          } as ComponentConfig<
            typeof C.TypographyNoWrap,
            HPRCDataExplorerAnnotation
          >,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILE_LOCATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILE_LOCATION,
          width: { max: "1fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildBiosampleAccession,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildFamilyId,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPopulationAbbreviation,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
          width: { max: "0.5fr", min: "112px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildPopulationDescriptor,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildProject,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
          width: { max: "1fr", min: "160px" },
        },
        {
          componentConfig: {
            component: C.BasicCell,
            viewBuilder: V.buildContributors,
          } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAnnotation>,
          enableGrouping: true,
          header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
          id: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
          width: { max: "1fr", min: "160px" },
        },
      ],
      tableOptions: {
        downloadFilename: "annotations",
        enableExpanding: true,
        enableGrouping: true,
        enableTableDownload: true,
        initialState: {
          columnVisibility: {
            [HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS]: false,
            [HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID]: false,
            [HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION]: false,
            [HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR]: false,
            [HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT]: false,
          },
          expanded: true,
          sorting: [
            {
              desc: SORT_DIRECTION.ASCENDING,
              id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
            },
          ],
        },
      },
    } as ListConfig<HPRCDataExplorerAnnotation>,
    listView: {
      disablePagination: true,
    },
    route: "annotations",
    staticLoadFile: "catalog/output/annotations.json",
    ui: { title: "Annotations" },
  };
