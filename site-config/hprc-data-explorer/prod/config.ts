import { SiteConfig } from "@databiosphere/findable-ui/lib/config/entities";
import localConfig from "../local/config";

const config: SiteConfig = {
  ...localConfig,
  browserURL: "https://data.humanpangenome.org",
};

export default config;
