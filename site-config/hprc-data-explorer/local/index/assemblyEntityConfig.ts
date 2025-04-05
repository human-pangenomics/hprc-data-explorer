import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode";
import { HPRCDataExplorerAssembly } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getAssemblyId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";

/**
 * Entity config object responsible to config anything related to the /assemblies route.
 */
export const assemblyEntityConfig: EntityConfig<HPRCDataExplorerAssembly> = {
  categoryGroupConfig: {
    categoryGroups: [
      {
        categoryConfigs: [
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
          },
        ],
      },
    ],
    key: "assemblies",
  },
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  explorerTitle: "Assemblies",
  getId: getAssemblyId,
  label: "Assemblies",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.FileDownload,
          viewBuilder: V.buildAssemblyDownload,
        } as ComponentConfig<typeof C.FileDownload, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.DOWNLOAD,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.DOWNLOAD,
        width: { max: "auto", min: "76px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildSampleId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.SAMPLE_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFilename,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILENAME,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILENAME,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFileSize,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FILE_SIZE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FILE_SIZE,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildHaplotype,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        columnVisible: true,
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildAwsFasta,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAssembly
        >,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.AWS_FASTA,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.AWS_FASTA,
        width: { max: "1fr", min: "112px" },
      },
      {
        columnVisible: true,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAccession,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ACCESSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ACCESSION,
        width: { max: "1fr", min: "160px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildFamilyId,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        columnVisible: true,
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildFastaMd5,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAssembly
        >,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FASTA_MD5,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FASTA_MD5,
        width: { max: "1fr", min: "112px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildFastaSha256,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAssembly
        >,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FASTA_SHA256,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.FASTA_SHA256,
        width: { max: "1fr", min: "112px" },
      },
      {
        columnVisible: false,
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPopulationAbbreviation,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
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
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildRelease,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.RELEASE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
        width: { max: "0.5fr", min: "80px" },
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
            id: HPRC_DATA_EXPLORER_CATEGORY_KEY.SAMPLE_ID,
          },
        ],
      },
    },
  } as ListConfig<HPRCDataExplorerAssembly>,
  listView: {
    disablePagination: true,
    enableDownload: true,
    enableTab: false,
  },
  route: "assemblies",
  staticLoadFile: "catalog/assemblies.json",
};
