import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { HPRCDataExplorerSample } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getSampleId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import { EntityTitle } from "../../../../app/views/ExploreView/components/EntityTitle/entityTitle";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";
import { DOCUMENTATION_URL } from "../../docs";

/**
 * Entity config object responsible to config anything related to the /samples route.
 */
export const sampleEntityConfig: EntityConfig<HPRCDataExplorerSample> = {
  categoryGroupConfig: {
    categoryGroups: [
      {
        categoryConfigs: [
          {
            chart: { enable: true },
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
          },
          {
            chart: { enable: true },
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.COLLECTION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.COLLECTION,
          },
        ],
        label: "Source",
      },
      {
        categoryConfigs: [
          {
            chart: { enable: true },
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
          },
          {
            chart: { enable: true },
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.TRIO_AVAILABLE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TRIO_AVAILABLE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SEX,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SEX,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.TISSUE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TISSUE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
          },
        ],
        label: "Sample",
      },
    ],
    key: "samples",
  },
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getSampleId,
  label: "Samples",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSampleId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
        meta: { columnPinned: true },
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAlternativeId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ALTERNATIVE_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ALTERNATIVE_ID,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBiosampleAccession,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPopulationDescriptor,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPopulationAbbreviation,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFamilyId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildMaternalId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.MATERNAL_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.MATERNAL_ID,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPaternalId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PATERNAL_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PATERNAL_ID,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildTrioAvailable,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TRIO_AVAILABLE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TRIO_AVAILABLE,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSex,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SEX,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SEX,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildTissue,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.TISSUE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.TISSUE,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildProject,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildContributors,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildCollection,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerSample>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.COLLECTION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.COLLECTION,
        width: { max: "0.5fr", min: "112px" },
      },
    ],
    tableOptions: {
      enableExpanding: true,
      enableGrouping: true,
      enableTableDownload: true,
      initialState: {
        columnVisibility: {
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ALTERNATIVE_ID]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.MATERNAL_ID]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.PATERNAL_ID]: false,
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
  } as ListConfig<HPRCDataExplorerSample>,
  listView: {
    disablePagination: true,
  },
  route: "samples",
  staticLoadFile: "catalog/output/samples.json",
  ui: {
    title: EntityTitle({
      slotProps: { link: { href: DOCUMENTATION_URL.SAMPLES } },
      title: "Samples",
    }),
  },
};
