export interface CheckItems {
  id: number;
  org_id: number;
  detail_id: number;
  department: string;
  account_id: number;
  type: string;
  amount: number;
  explanation: string;
  sub_total: number;
  total: number;
  created_at: string;
  accounts: {
    code: string;
    title: string;
  };
}
