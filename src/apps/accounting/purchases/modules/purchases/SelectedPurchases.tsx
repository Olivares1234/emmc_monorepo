import { FaTrash } from "react-icons/fa";
import { Button, clsx, Flex, Paper, Title } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";
import { confirmationDialog } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { CustomTabs } from "common/components/tabs";

import PaymentData from "./components/PaymentData";
import PurchasesDetails from "./components/PurchasesDetails";
import PurchasesItemTable from "./components/PurchasesItemTable";
import { useDeletePurchases, useGetSinglePurchases } from "./hooks";

export const PurchasesTabs = [
  {
    label: "Items",
    value: "item",
    component: <PurchasesItemTable />,
  },
  {
    label: "Payments",
    value: "payments",
    component: <PaymentData />,
  },
];

function SelectedPurchases() {
  const [data, isLoading, queryRes] = useGetSinglePurchases();
  // const nav = useNavigate();
  const [deletePurchases] = useDeletePurchases();

  const handleDelete = async () => {
    confirmationDialog({
      message: "Are you sure you want to delete this Purchase Order?",
      onOk: async () => {
        await deletePurchases(data?.id);
      },
    });
  };

  return (
    <Paper
      withBorder
      p={8}
      shadow="md"
      className={clsx("flex flex-col flex-grow relative")}
    >
      <LoadingWithText text="Loading invoice information..." show={isLoading} />
      {!isLoading && !queryRes?.error && (
        <>
          <Flex justify="space-between" align="center" mb={12}>
            <Title size="h3">Purchase Order Details</Title>
            <RoleChecker nonSuperAdmin>
              <Button color="red" size="xs" onClick={handleDelete}>
                <FaTrash />
              </Button>
            </RoleChecker>
          </Flex>
          <PurchasesDetails data={data} />
          <CustomTabs defaultValue="item" data={PurchasesTabs} />
        </>
      )}
    </Paper>
  );
}

export default SelectedPurchases;
