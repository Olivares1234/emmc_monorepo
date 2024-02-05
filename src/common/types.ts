import { LedgerEntries } from "./accounting/types";

export type AnyObject = Record<string, any>;

export interface ApiMeta {
  total: number;
  current_page: number;
  limit: number;
  current_total: number;
  final_page: number;
  has_next_page: boolean;
}

export interface ApiResponse<T = AnyObject | AnyObject[]> {
  data: T;
  message?: string;
  meta?: ApiMeta;
}

export interface ApiResponseWithEntries<T = AnyObject | AnyObject[]>
  extends ApiResponse<T> {
  new_entries: LedgerEntries;
}

export interface FormModal<T = AnyObject> {
  onClose: () => void;
  data?: T;
  isEditMode?: boolean;
}

export type FetchMode = "select_option" | "paged";

export enum DateFormat {
  FULLMONTH = "MMMM DD, YYYY",
  SHORTMONTH = "MMM DD, YYYY",
  STANDARD = "YYYY-MM-DD",
}

export enum AccountingEntry {
  Credit = "Credit",
  Debit = "Debit",
}
