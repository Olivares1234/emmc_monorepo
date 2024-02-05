import { InvoiceStatus } from "../types";

export interface InvoiceUpdateStatusProps {
  id: number;
  status: InvoiceStatus;
}

export interface InvoiceUpdateStatusForm {
  approvers: string[];
  description: string;
  status: InvoiceStatus;
}
