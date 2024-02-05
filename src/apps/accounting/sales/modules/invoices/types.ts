import { Customers } from "../customers/types";

import { invoiceDefaultValue, invoiceItemDefaultValue } from "./components/constants";

export interface Invoice {
  id: number;
  org_id: number;
  customer_id: number;
  collection_id: number;
  invoice_no: string;
  delivery_date: string;
  currency: string;
  note_type: "Sales" | "Debit";
  note: string;
  sales_type: string;
  created_at: string;
  status: string;
  customer: Customers;
  total: number | null;
}

export interface InvoiceTotal {
  id: number;
  invoice_no: string;
  totals: number;
}

export type InvoiceDefaultvalue = {
  items: Array<typeof invoiceItemDefaultValue>;
} & Omit<typeof invoiceDefaultValue, "items">;

export interface InvoiceItem {
  id: number;
  org_id: number;
  invoice_id: number;
  dr_no: string;
  purchase_order_no: string;
  particular: string;
  part_no: string;
  quantity: number;
  unit_price: number;
  remarks: string;
  total: number;
  note_type?: string;
  note?: string;
  note_amount?: number;
  created_at: string;
}

export type NoteDetailsProps = Pick<InvoiceItem, "note" | "note_type" | "note_amount">;

export enum InvoiceStatus {
  Collected = "Collected",
  Not_Collected = "Not_Collected",
  Cancelled = "Cancelled",
  Revised = "Revised",
}
