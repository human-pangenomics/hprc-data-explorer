import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../app/components/index";
import { ROUTE } from "../../../app/routes/constants";
import { alignmentEntityConfig } from "./index/alignmentEntityConfig";
import { annotationEntityConfig } from "./index/annotationEntityConfig";
import { assemblyEntityConfig } from "./index/assemblyEntityConfig";
import { rawSequencingDataEntityConfig } from "./index/rawSequencingDataEntityConfig";

// Template constants
const LOCALHOST = "http://localhost:3000";
const APP_TITLE = "HPRC Data Explorer";
const BROWSER_URL = LOCALHOST;
const GIT_HUB_REPO_URL =
  "https://github.com/human-pangenomics/hprc-data-explorer";
const HOME_PAGE_PATH = ROUTE.RAW_SEQUENCING_DATA;
const PORTAL_URL = "https://humanpangenome.org";

export function makeConfig(browserUrl: string, gitHubUrl: string): SiteConfig {
  return {
    appTitle: APP_TITLE,
    browserURL: browserUrl,
    dataSource: {
      url: "",
    },
    enableEntitiesView: true,
    entities: [
      rawSequencingDataEntityConfig,
      assemblyEntityConfig,
      annotationEntityConfig,
      alignmentEntityConfig,
    ],
    gitHubUrl,
    layout: {
      footer: {
        Branding: "",
        versionInfo: true,
      },
      header: {
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32.5,
          link: HOME_PAGE_PATH,
          src: "/images/hprcDataExplorer.png",
        }),
        navigation: [
          undefined,
          [
            {
              label: "Sequencing Data",
              url: ROUTE.RAW_SEQUENCING_DATA,
            },
            { label: "Assemblies", url: ROUTE.ASSEMBLIES },
            { label: "Annotations", url: ROUTE.ANNOTATIONS },
            { label: "Alignments", url: ROUTE.ALIGNMENTS },
          ],
          [
            {
              label: C.LabelIconMenuItem({ label: "HPRC Website" }),
              target: ANCHOR_TARGET.BLANK,
              url: PORTAL_URL,
            },
            {
              label: "Help & Documentation",
              menuItems: [
                {
                  label: "Data Use Agreement",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://humanpangenome.org/data-use/",
                },
                {
                  label: "Samples",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://github.com/human-pangenomics/hprc_intermediate_assembly/blob/main/data_tables/sample/README.md",
                },
                {
                  label: "Assemblies",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://github.com/human-pangenomics/hprc_intermediate_assembly/blob/main/data_tables/README.md",
                },
                {
                  label: "Sequencing Data",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://github.com/human-pangenomics/hprc_intermediate_assembly/blob/main/data_tables/sequencing_data/README.md",
                },
                {
                  label: "Annotations",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://github.com/human-pangenomics/hprc_intermediate_assembly/blob/main/data_tables/annotation/README.md",
                },
                {
                  icon: C.GitHubIcon({ fontSize: "small" }),
                  label: "GitHub",
                  target: ANCHOR_TARGET.BLANK,
                  url: "https://github.com/human-pangenomics/hprc-data-explorer",
                },
              ],
              url: "",
            },
          ],
        ],
      },
    },
    redirectRootToPath: HOME_PAGE_PATH,
  };
}

const config: SiteConfig = makeConfig(BROWSER_URL, GIT_HUB_REPO_URL);

export default config;
