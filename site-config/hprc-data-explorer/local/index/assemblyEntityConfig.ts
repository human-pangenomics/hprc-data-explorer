import {
  ComponentConfig,
  EntityConfig,
  ListConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { HPRCDataExplorerAssembly } from "../../../../app/apis/catalog/hprc-data-explorer/common/entities";
import { getAssemblyId } from "../../../../app/apis/catalog/hprc-data-explorer/common/utils";
import * as C from "../../../../app/components/index";
import * as V from "../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";
import { EntityTitle } from "../../../../app/views/ExploreView/components/EntityTitle/entityTitle";
import {
  HPRC_DATA_EXPLORER_CATEGORY_KEY,
  HPRC_DATA_EXPLORER_CATEGORY_LABEL,
} from "../../category";
import { DOCUMENTATION_URL } from "../../docs";

/**
 * Entity config object responsible to config anything related to the /assemblies route.
 */
export const assemblyEntityConfig: EntityConfig<HPRCDataExplorerAssembly> = {
  categoryGroupConfig: {
    categoryGroups: [
      {
        categoryConfigs: [
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
          },
        ],
        label: "Source",
      },
      {
        categoryConfigs: [
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_DESCRIPTOR,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_DESCRIPTOR,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.FAMILY_ID,
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
      {
        categoryConfigs: [
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.RELEASE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.HAPLOTYPE,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.HAPLOTYPE,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.PHASING,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PHASING,
          },
          {
            key: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_METHOD,
            label: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_METHOD,
          },
        ],
        label: "Assembly",
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
        enableHiding: false,
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
        meta: { columnPinned: true },
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
          viewBuilder: V.buildGenbankAccession,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.GENBANK_ACCESSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.GENBANK_ACCESSION,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAssemblyName,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_NAME,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_NAME,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildBiosampleAccession,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.BIOSAMPLE_ACCESSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.BIOSAMPLE_ACCESSION,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.LinkCell,
          viewBuilder: V.buildUcscBrowserUrl,
        } as ComponentConfig<typeof C.LinkCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.UCSC_BROWSER_URL,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.UCSC_BROWSER_URL,
        width: { max: "0.5fr", min: "160px" },
      },
      {
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
          viewBuilder: V.buildPopulationAbbreviation,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.POPULATION_ABBREVIATION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION,
        width: { max: "0.5fr", min: "112px" },
      },
      {
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
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildProject,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PROJECT,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PROJECT,
        width: { max: "1fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildContributors,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.CONTRIBUTORS,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.CONTRIBUTORS,
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
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildPhasing,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.PHASING,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.PHASING,
        width: { max: "0.5fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAssemblyMethod,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_METHOD,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_METHOD,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAssemblyMethodVersion,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: true,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_METHOD_VERSION,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_METHOD_VERSION,
        width: { max: "0.5fr", min: "160px" },
      },
      {
        componentConfig: {
          component: C.BasicCell,
          viewBuilder: V.buildAssemblyDate,
        } as ComponentConfig<typeof C.BasicCell, HPRCDataExplorerAssembly>,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_DATE,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_DATE,
        width: { max: "0.5fr", min: "112px" },
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
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildAssemblyFai,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAssembly
        >,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_FAI,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_FAI,
        width: { max: "1fr", min: "112px" },
      },
      {
        componentConfig: {
          component: C.TypographyNoWrap,
          viewBuilder: V.buildAssemblyGzi,
        } as ComponentConfig<
          typeof C.TypographyNoWrap,
          HPRCDataExplorerAssembly
        >,
        enableGrouping: false,
        header: HPRC_DATA_EXPLORER_CATEGORY_LABEL.ASSEMBLY_GZI,
        id: HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_GZI,
        width: { max: "1fr", min: "112px" },
      },
    ],
    tableOptions: {
      downloadFilename: "assemblies",
      enableExpanding: true,
      enableGrouping: true,
      enableTableDownload: true,
      initialState: {
        columnVisibility: {
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_DATE]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_FAI]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_GZI]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_METHOD_VERSION]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.ASSEMBLY_NAME]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.AWS_FASTA]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.FASTA_MD5]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.FASTA_SHA256]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.FAMILY_ID]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.GENBANK_ACCESSION]: false,
          [HPRC_DATA_EXPLORER_CATEGORY_KEY.POPULATION_ABBREVIATION]: false,
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
  } as ListConfig<HPRCDataExplorerAssembly>,
  listView: {
    disablePagination: true,
  },
  route: "assemblies",
  staticLoadFile: "catalog/output/assemblies.json",
  ui: {
    title: EntityTitle({
      slotProps: { link: { href: DOCUMENTATION_URL.ASSEMBLIES } },
      title: "Assemblies",
    }),
  },
};
