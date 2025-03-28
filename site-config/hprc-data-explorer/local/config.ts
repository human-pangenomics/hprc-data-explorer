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

export function makeConfig(browserUrl: string, gitHubUrl: string): SiteConfig {
  return {
    appTitle: APP_TITLE,
    browserURL: browserUrl,
    dataSource: {
      url: "",
    },
    entities: [
      rawSequencingDataEntityConfig,
      assemblyEntityConfig,
      annotationEntityConfig,
      alignmentEntityConfig,
    ],
    explorerTitle: APP_TITLE,
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
              label: "Help & Documentation",
              menuItems: [
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
