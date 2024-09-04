import { HprcTabCollection } from "./testInterfaces";

export const HPRC_TABS: HprcTabCollection = {
  alignments: {
    preselectedColumns: [],
    selectableColumns: [],
    tabName: "Alignments",
    url: "/alignments",
  },
  assemblies: {
    preselectedColumns: [],
    selectableColumns: [],
    tabName: "Assemblies",
    url: "/assemblies",
  },
  rawSequencingData: {
    preselectedColumns: [],
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
