import { ToolsCode, ToolsData } from "./types";

export const toolsList: ToolsData[] = [
  {
    title: "Sync Transaction No.",
    description: "Add transaction number and sync to all accounting database w/ tx no.",
    code: ToolsCode.SyncTxAcc,
    loadingButtonText: "Syncing",
  },
];
