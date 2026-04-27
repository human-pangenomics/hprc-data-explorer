import { HPRC_DATA_EXPLORER_CATEGORY_KEY } from "../../../../../site-config/hprc-data-explorer/category";
import { DefaultFilter } from "./types";

export const DEFAULT_ENTITY_FILTERS: Partial<Record<string, DefaultFilter[]>> =
  {
    annotations: [
      {
        categoryKey: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
        value: "2",
      },
    ],
    assemblies: [
      {
        categoryKey: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
        value: "2",
      },
    ],
  };
