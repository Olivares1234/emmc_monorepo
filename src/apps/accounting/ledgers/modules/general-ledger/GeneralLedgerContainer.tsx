import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { Table } from "common/components/table";
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setGeneralLedgerFilter } from "../../redux/ledgerSlice";
import { selectGeneralLedgerFilter } from "../../redux/selectors";

import { tableFormat } from "./constants";
import { useGetGeneralLedger } from "./hooks";

function GeneralLedgerContainer() {
  const [data, isLoading, paginate] = useGetGeneralLedger();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) =>
    dispatch(setGeneralLedgerFilter(value));

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex items-center justify-between mb-4">
        <ListSearchFilter
          showInputOnly
          onChange={handleFilterChange}
          filterSelector={selectGeneralLedgerFilter}
        />
      </div>
      <Table
        format={tableFormat}
        data={data}
        isLoading={isLoading}
        pagination={paginate}
      />
    </ContainerWrapper>
  );
}
export default GeneralLedgerContainer;
