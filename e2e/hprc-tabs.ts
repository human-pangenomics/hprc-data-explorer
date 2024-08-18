import { HprcTabCollection } from "./testInterfaces";

export const HPRC_TABS: HprcTabCollection = {
  assemblies: {
    preselectedColumns: [],
    selectableColumns: [],
    tabName: "Assemblies",
    url: "/assemblies",
  },
  pangenomes: {
    preselectedColumns: [],
    selectableColumns: [],
    tabName: "Pangenomes",
    url: "/pangenomes",
  },
  rawSequencingData: {
    preselectedColumns: [],
    selectableColumns: [],
    tabName: "Raw Sequencing Data",
    url: "/raw-sequencing-data",
  },
};

export const HPRC_TAB_LIST = [
  HPRC_TABS.rawSequencingData,
  HPRC_TABS.assemblies,
  HPRC_TABS.pangenomes,
];
