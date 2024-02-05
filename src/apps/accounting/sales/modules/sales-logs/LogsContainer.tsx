import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { Table } from "common/components/table";
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setLogsFilter } from "../../redux/salesSlice";
import { selectLogsFilter } from "../../redux/selectors";

import { tableFormat } from "./constants";
import { useGetLogs } from "./hooks";

function LogsContainer() {
  const [data, isLoading, paginate] = useGetLogs();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setLogsFilter(value));

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <div className="flex items-center justify-between mb-4">
        <ListSearchFilter
          showInputOnly
          onChange={handleFilterChange}
          filterSelector={selectLogsFilter}
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
export default LogsContainer;
