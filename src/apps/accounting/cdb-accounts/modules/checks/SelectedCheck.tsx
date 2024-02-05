import { FaTrash } from "react-icons/fa";
import { Button, clsx, Flex, Paper, Title } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";
import { confirmationDialog } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { CustomTabs } from "common/components/tabs";

import CheckDetails from "./components/CheckDetails";
import { checkTabs } from "./constants";
import { useDeleteChecks, useGetSingleCheck } from "./hooks";

// import PaymentData from "./components/PaymentData";
// import PurchasesDetails from "./components/PurchasesDetails";
// import PurchasesItemTable from "./components/PurchasesItemTable";
// import { useDeletePurchases, useGetSinglePurchases } from "./hooks";

function SelectedCheck() {
  const [data, isLoading, queryRes] = useGetSingleCheck();
  // // const nav = useNavigate();
  const [deleteChecks] = useDeleteChecks();

  const handleDelete = async () => {
    confirmationDialog({
      message: "Are you sure you want to delete this Check?",
      onOk: async () => {
        await deleteChecks(data?.id);
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
            <Title size="h3">Check voucher details</Title>
            <RoleChecker nonSuperAdmin>
              <Button color="red" size="xs" onClick={handleDelete}>
                <FaTrash />
              </Button>
            </RoleChecker>
          </Flex>
          <CheckDetails data={data} />
          <CustomTabs defaultValue="item" data={checkTabs} />
        </>
      )}
    </Paper>
  );
}

export default SelectedCheck;
