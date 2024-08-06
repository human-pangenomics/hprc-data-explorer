import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import * as C from "../../../app/components/index";
import { ROUTE } from "../../../app/routes/constants";
import { rawSequencingDataEntityConfig } from "./index/rawSequencingDataEntityConfig";

// Template constants
const LOCALHOST = "http://localhost:3000";
const APP_TITLE = "HPRC Data Explorer";
const BROWSER_URL = LOCALHOST;
const HOME_PAGE_PATH = ROUTE.RAW_SEQUENCING_DATA;

export function makeConfig(browserUrl: string): SiteConfig {
  return {
    appTitle: APP_TITLE,
    browserURL: browserUrl,
    dataSource: {
      url: "",
    },
    entities: [rawSequencingDataEntityConfig],
    explorerTitle: APP_TITLE,
    layout: {
      footer: {
        Branding: "",
      },
      header: {
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32.5,
          link: HOME_PAGE_PATH,
          src: "/images/hprcDataExplorer.png",
        }),
      },
    },
    redirectRootToPath: HOME_PAGE_PATH,
  };
}

const config: SiteConfig = makeConfig(BROWSER_URL);

export default config;
