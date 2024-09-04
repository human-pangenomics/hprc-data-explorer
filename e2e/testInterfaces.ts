export interface TabDescription {
  preselectedColumns: columnDescription[];
  selectableColumns: columnDescription[];
  tabName: string;
  url: string;
}

export interface HprcTabCollection {
  alignments: TabDescription;
  assemblies: TabDescription;
  rawSequencingData: TabDescription;
}

export interface columnDescription {
  name: string;
  sortable: boolean;
}
