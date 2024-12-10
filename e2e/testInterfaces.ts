export interface TabDescription {
  preselectedColumns: ColumnDescription[];
  searchFiltersPlaceholderText: string;
  selectableColumns: ColumnDescription[];
  tabName: string;
  url: string;
}

export interface HprcTabCollection {
  alignments: TabDescription;
  annotations: TabDescription;
  assemblies: TabDescription;
  rawSequencingData: TabDescription;
}

export interface ColumnDescription {
  name: string;
  sortable: boolean;
}
