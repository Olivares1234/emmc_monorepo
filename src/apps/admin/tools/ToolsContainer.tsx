import { useMemo } from "react";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { Layout } from "common/components/layout";

import ToolsTile from "./components/ToolsTile";
import { toolsList } from "./datasets";
import { useSyncTxNumber } from "./hooks";
import { ToolsCode } from "./types";

function ToolsContainer() {
  const [syncTx, loadingTx] = useSyncTxNumber();

  const onClickActions = useMemo<Record<ToolsCode, () => void>>(
    () => ({
      [ToolsCode.SyncTxAcc]: syncTx,
    }),
    [syncTx],
  );

  const loadingStatus = useMemo<Record<ToolsCode, boolean>>(
    () => ({
      [ToolsCode.SyncTxAcc]: loadingTx,
    }),
    [loadingTx],
  );

  return (
    <Layout title="Tools">
      <div className="container mx-auto my-8 p-12">
        <MenuBreadcrumbs fontSize="xl" />
        <div className="grid grid-cols-4">
          {toolsList.map((tool) => (
            <ToolsTile
              key={tool.code}
              description={tool.description}
              title={tool.title}
              loadingButtonText={tool.loadingButtonText}
              onClick={onClickActions[tool.code]}
              isLoading={loadingStatus[tool.code]}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ToolsContainer;
