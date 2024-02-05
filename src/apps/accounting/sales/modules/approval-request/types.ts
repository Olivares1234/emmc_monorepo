import { AnyObject } from "common/types";

export interface Approval {
  id: number;
  requested_by: string;
  module: string;
  difference: AnyObject;
  is_approved: string;
}
