import { Route, Routes } from "react-router-dom";
import { Button, Flex, Paper, Title } from "@mantine/core";
import { MenuBreadcrumbs } from "common/components/breadcrumbs";
import { ContainerWrapper } from "common/components/layout";
import { List } from "common/components/list";
import ListSearchFilter from "common/components/list/ListSearchFilter";
import { useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { NoData } from "common/no-data";
import { AnyObject } from "common/types";
import { useAppDispatch } from "redux/hooks";

import { setCheckVoucherFilter } from "../../redux/cdbSlice";
import { selectCdbVoucherFilter } from "../../redux/selectors";

import ChecksFilter from "./components/ChecksFilter";
import ChecksModal from "./components/ChecksModal";
import { useGetChecks } from "./hooks";
import SelectedCheck from "./SelectedCheck";
import { Check } from "./types";

function ChecksContainer() {
  const [{ data, meta }, isLoading, paginate] = useGetChecks();
  const openModal = useModalContext();
  const dispatch = useAppDispatch();
  const handleFilterChange = (value: AnyObject) => dispatch(setCheckVoucherFilter(value));

  const handleAdd = () =>
    openModal({
      title: "Create Check",
      render: (close) => <ChecksModal onClose={close} />,
      size: "90vw",
    });

  return (
    <ContainerWrapper compactTopMargin>
      <MenuBreadcrumbs />
      <Title size="h3">Check Vouchers ({meta?.total})</Title>
      <Flex className="flex-grow" columnGap={24}>
        <Flex
          direction="column"
          className="flex-grow max-w-xs min-w-max"
          w="100%"
          rowGap={5}
        >
          <RoleChecker nonSuperAdmin>
            <Flex columnGap={6}>
              <Button className="flex-1" color="teal" onClick={handleAdd}>
                Create check voucher
              </Button>
            </Flex>
          </RoleChecker>
          <ListSearchFilter
            filterSelector={selectCdbVoucherFilter}
            onChange={handleFilterChange}
            advanceFilterElement={ChecksFilter}
          />
          <List<Check>
            data={data}
            dataKey="id"
            item={(val) => val.checkNumber}
            isLoading={isLoading}
            pagination={paginate}
          />
        </Flex>
        <Flex direction="column" className="flex-grow">
          <Routes>
            <Route
              index
              element={
                <Paper className="flex-grow flex items-center">
                  <NoData message="No selected check voucher" />
                </Paper>
              }
            />
            <Route path="/:id" element={<SelectedCheck />} />
          </Routes>
        </Flex>
      </Flex>
    </ContainerWrapper>
  );
}
export default ChecksContainer;
