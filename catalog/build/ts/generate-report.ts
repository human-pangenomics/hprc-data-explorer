import { generateCatalogBuildReport } from "./reports";

(async () => {
  await generateCatalogBuildReport();
  console.log("Updated catalog build report");
})();
