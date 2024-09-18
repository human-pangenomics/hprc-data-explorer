export interface TabDescription {
  preselectedColumns: columnDescription[];
  searchFiltersPlaceholderText: string;
  selectableColumns: columnDescription[];
  tabName: string;
  url: string;
}

export interface HprcTabCollection {
  alignments: TabDescription;
  annotations: TabDescription;
  assemblies: TabDescription;
  rawSequencingData: TabDescription;
}

export interface columnDescription {
  name: string;
  sortable: boolean;
}
