import { HprcTabCollection } from "./testInterfaces";

const SEARCH_FILTERS_PLACEHOLDER_TEXT = "Search all filters...";

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
    url: "/annotations",
  },
  assemblies: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Assemblies",
    url: "/assemblies",
  },
  rawSequencingData: {
    preselectedColumns: [],
    searchFiltersPlaceholderText: SEARCH_FILTERS_PLACEHOLDER_TEXT,
    selectableColumns: [],
    tabName: "Sequencing Data",
    url: "/raw-sequencing-data",
  },
};

export const HPRC_TAB_LIST = [
  HPRC_TABS.rawSequencingData,
  HPRC_TABS.assemblies,
  HPRC_TABS.alignments,
];
