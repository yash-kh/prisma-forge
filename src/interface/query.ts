export interface WhereFilterArrObj {
  type: WhereFilterType;
  column: string;
  key?: string;
  value?: string | number;
  dateObj?: WhereFilterDate;
}

interface WhereFilterDate {
  startDate: Date | number;
  endDate: Date | number;
}

export enum WhereFilterType {
  equal = "equal",
  contains = "contains",
  date = "date",
  boolean = "boolean",
  JSON_equals = "JSON_equals",
  JSON_date = "JSON_date",
}
