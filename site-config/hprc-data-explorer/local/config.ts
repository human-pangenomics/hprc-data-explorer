import { FILTER_SORT } from "@databiosphere/findable-ui/lib/common/filters/sort/config/types";
import type { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../app/components/index";
import { ROUTE } from "../../../app/routes/constants";
import { alignmentEntityConfig } from "./index/alignmentEntityConfig";
import { annotationEntityConfig } from "./index/annotationEntityConfig";
import { assemblyEntityConfig } from "./index/assemblyEntityConfig";
import { rawSequencingDataEntityConfig } from "./index/rawSequencingDataEntityConfig";
import { sampleEntityConfig } from "./index/sampleEntityConfig";
import { HEADER_NAVIGATION } from "./navigation";

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
    enableEntitiesView: true,
    entities: [
      sampleEntityConfig,
      rawSequencingDataEntityConfig,
      assemblyEntityConfig,
      annotationEntityConfig,
      alignmentEntityConfig,
    ],
    filterSort: { sortBy: FILTER_SORT.COUNT },
    gitHubUrl,
    layout: {
      footer: {
        Branding: "",
        navLinks: [
          {
            label: "Catalog Build Report",
            url: `https://github.com/human-pangenomics/hprc-data-explorer/blob/${process.env.NEXT_PUBLIC_GIT_HASH}/catalog/build/reports/catalog-build-report.md`,
          },
        ],
        poweredByCC: {
          alt: "Powered by Clever Canary",
          src: "/images/powered-by-clevercanary.webp",
        },
        versionInfo: true,
      },
      header: {
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32.5,
          link: HOME_PAGE_PATH,
          src: "/images/hprcDataExplorer.png",
        }),
        navigation: HEADER_NAVIGATION,
      },
    },
    redirectRootToPath: HOME_PAGE_PATH,
  };
}

const config: SiteConfig = makeConfig(BROWSER_URL, GIT_HUB_REPO_URL);

export default config;
