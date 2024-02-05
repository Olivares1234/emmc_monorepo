export interface Logs {
  id: number;
  email: number;
  request_type: string;
  description: string;
  difference: Record<
    string,
    {
      old: string;
      new: string;
    }
  >;
}
