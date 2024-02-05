import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Title } from "@mantine/core";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { TableActionMenu } from "common/components/table/types";

import CostingModal from "./modals/CostingModal";
import { RscValues } from "./modals/types";
import { costingTableFormat } from "./constants";
import { useDeleteCosting, useGetCostings } from "./hooks";

function CostingContainer() {
  const openModal = useModalContext();
  const [{ data }, isLoading, paginate] = useGetCostings();
  const { id } = useParams();
  const [deleteCosting] = useDeleteCosting();

  const actionMenu: Array<TableActionMenu<RscValues>> = useMemo(
    () => [
      {
        label: "Update",
        onClick: (data) =>
          openModal({
            title: "Update Costing",
            render: (close) => (
              <CostingModal
                isEditMode
                data={{
                  projectId: Number(id),
                  costingId: data.id,
                }}
                onClose={close}
              />
            ),
            size: "50vw",
          }),
      },
      {
        label: "Delete",
        onClick: (data) =>
          confirmationDialog({
            message: "Are you sure you want to delete this costing?",
            onOk: async () => {
              await deleteCosting(Number(data?.id));
            },
          }),
      },
    ],
    [id],
  );

  const handleAddItem = () =>
    openModal({
      title: "Add Costing",
      render: (close) => (
        <CostingModal
          data={{
            projectId: Number(id),
          }}
          onClose={close}
        />
      ),
      size: "50vw",
    });

  return (
    <Flex className="flex-grow" mt={24} direction="column">
      <Flex align="center" justify="space-between" mb={8}>
        <Title size="h4">List (2)</Title>
        <RoleChecker allowAll>
          <Button size="xs" color="teal" variant="outline" onClick={handleAddItem}>
            Add Costing
          </Button>
        </RoleChecker>
      </Flex>
      <Table<RscValues>
        isLoading={isLoading}
        data={data}
        format={costingTableFormat}
        actionMenu={actionMenu}
        pagination={paginate}
      />
    </Flex>
  );
}

export default CostingContainer;
