import { Supplier } from "../supplier/type";

import { purchaseDefaultValue, purchaseItemDefaultValue } from "./components/constants";

export interface PurchaseItemModal {
  purchaseId: number;
  currentItemCount: number;
}
export interface Purchases {
  id: number;
  org_id: number;
  purchases_payments_id: number;
  accounts_id: number;
  supplier_id: number;
  invoice_no: string;
  invoice_date: string;
  currency: string;
  dr_no: string;
  created_at: string;
  status: string;
  supplier: Supplier;
  total: number | null;
}

export type PurchaseDefaultvalue = {
  items: Array<typeof purchaseItemDefaultValue>;
} & Omit<typeof purchaseDefaultValue, "items">;

export interface PurchasesItem {
  purchase_order_id: number;
  accounts_id: number;
  org_id: number;
  part_no: string;
  purchase_order_no: string;
  purchase_request_no: string;
  particular: string;
  quantity: number;
  unit_price: number;
  remarks: string;
  total: number;
  note_type?: string;
  note?: string;
  note_amount?: number;
  created_at: string;
}

export type NoteDetailsProps = Pick<PurchasesItem, "note" | "note_type" | "note_amount">;
