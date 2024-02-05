export enum ToolsCode {
  SyncTxAcc = "Sync Transaction Accounting",
}

export interface ToolsData {
  title: string;
  description: string;
  buttonText?: string;
  code: ToolsCode;
  loadingButtonText?: string;
}
