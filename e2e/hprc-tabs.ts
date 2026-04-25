import { HprcTabCollection } from "./testInterfaces";

const SEARCH_FILTERS_PLACEHOLDER_TEXT = "Search all filters...";
const DEFAULT_RELEASE_FILTER =
  "%5B%7B%22categoryKey%22%3A%22release%22%2C%22value%22%3A%5B%222%22%5D%7D%5D";

export const HPRC_TABS: HprcTabCollection = {
  alignments: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Alignments",
    url: "/alignments",
  },
  annotations: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Annotations",
    url: `/annotations?filter=${DEFAULT_RELEASE_FILTER}`,
  },
  assemblies: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Assemblies",
    url: `/assemblies?filter=${DEFAULT_RELEASE_FILTER}`,
  },
  rawSequencingData: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Sequencing Data",
    url: "/raw-sequencing-data",
  },
  samples: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Samples",
    url: "/samples",
  },
};

export const HPRC_TAB_LIST = [
  HPRC_TABS.rawSequencingData,
  HPRC_TABS.samples,
  HPRC_TABS.assemblies,
  HPRC_TABS.alignments,
];
