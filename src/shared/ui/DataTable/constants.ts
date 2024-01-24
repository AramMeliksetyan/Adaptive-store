import { UseFormWatch, UseFormReset } from "react-hook-form";
import { DynamicObject } from "shared/helpers/hooks/useFetchQuery";

export interface IPaginated<T> {
  totalItemCount: number;
  count: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  data: T[];
}

export interface IColumn {
  label: string;
  layout?: (row: any) => JSX.Element;
  field: string;
}

export interface IExpandableColumn {
  label: string;
  layout?: (variant: any, row: any) => JSX.Element;
  field: string;
}

export interface IFilterOptions {
  watch: UseFormWatch<any>;
  reset: UseFormReset<any>;
}

export interface IEnhancedToolbar {
  onExport?: () => void;
  onAction?: () => void;
  otherActions?: boolean;
  exportEnabled: boolean;
  rowsSelected: number;
  filterOptions: IFilterOptions;
  fetchData: () => void;
  hasFilters: boolean;
  hasSearchInput: boolean;
  handleToggleFilter: () => void;
  hasCustomActions?: boolean;
}

export type ButtonVariantColor =
  | "error"
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning";

export interface IAction<T> {
  label: string;
  onClick: (row: T) => any;
  color: ButtonVariantColor;
}

export interface IExpandableAction<V, T> {
  label: string;
  onClick: (variant: V, row: T) => any;
  color: ButtonVariantColor;
}

export interface ITableProps<T, V> {
  columns: IColumn[];
  toolbar?: boolean;
  data?: T[];
  sortable?: boolean;
  exportEnabled?: boolean;
  otherActions?: boolean;
  onAction?: (arr?: number[]) => void;
  paginatedData?: IPaginated<T>;
  Filter?: () => JSX.Element;
  onChange?: (args: DynamicObject) => void;
  onExport?: (arr?: number[]) => void;
  onChangeSelected?: (list: number[]) => void;
  selectable?: boolean;
  getActions?: (row: T) => IAction<T>[];
  getExpandableActions?: (variant: V, row: T) => IExpandableAction<V, T>[];
  enablePagination?: boolean;
  filterOptions?: IFilterOptions;
  section?: string;
  hasSearchInput?: boolean;
  hasCustomActions?: boolean;
  CustomActions?: () => JSX.Element;
  gridProp?: string;
  totalCount?: string;
  tableTitle: string;
  addButtonOnClick?: () => void;
  expandable?: boolean;
  expandableColumns?: IColumn[];
  nestedListProp?: string;
}

export const rowsPerPageOptions = [5, 10, 20];
