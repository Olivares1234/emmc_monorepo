import {
  invoiceDefaultValue,
  invoiceItemDefaultValue,
} from "apps/accounting/sales/modules/invoices/components/constants";
import { InvoiceItem } from "apps/accounting/sales/modules/invoices/types";

export interface Sample {
  id: number;
  sample_id: number;
}

export interface InvoiceTotal {
  id: number;
  invoice_no: string;
}

export type InvoiceDefaultvalue = {
  items: Array<typeof invoiceItemDefaultValue>;
} & Omit<typeof invoiceDefaultValue, "items">;

export interface SampleItem {
  id: number;
  sample: number;
}

export type NoteDetailsProps = Pick<InvoiceItem, "note" | "note_type" | "note_amount">;

export enum InvoiceStatus {
  Collected = "Collected",
  Not_Collected = "Not_Collected",
  Cancelled = "Cancelled",
  Revised = "Revised",
}
