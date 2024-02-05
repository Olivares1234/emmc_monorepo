export interface Supplier {
  id: number;
  name: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
  barangay_code: string;
  municipality_code: string;
  province_code: string;
  region_code: string;
  preferred_transaction_type: "zero_rated" | "vatable" | "exempt";
  line_1: string;
  tin_no: string;
  payment_terms: number;
}
