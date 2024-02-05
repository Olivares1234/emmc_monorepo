export interface Customers {
  id: number;
  org_id: number;
  name: string;
  line_1: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  tin_no: string;
  payment_terms: number;
  zero_rated: boolean;
  vatable: boolean;
  output_tax: boolean;
  conversion_rate: number;
  created_at: string;
  payment_schedule: string;
  allow_multiple_dr: boolean;
}
