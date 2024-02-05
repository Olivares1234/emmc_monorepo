import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, clsx, Flex, Paper, Title } from "@mantine/core";
import { LoadingWithText } from "common/components/loader";
import { confirmationDialog, useModalContext } from "common/components/modal";
import RoleChecker from "common/components/roles/RoleChecker";
import { CustomTabs } from "common/components/tabs";
import { NoData } from "common/no-data";

import ProjectDetails from "./components/ProjectDetails";
import ProjectModal from "./modals/ProjectModal";
import CostingContainer from "./tabs/costing/CostingContainer";
import { useDeleteProject, useGetSingleProject } from "./hooks";

export const InvoiceTabs = [
  {
    label: "Costing",
    value: "costing",
    component: <CostingContainer />,
  },
  {
    label: "Quotation",
    value: "quotation",
    component: <NoData message="No Quotation Yet" />,
  },
];

function SelectedInvoice() {
  const [data, isLoading, queryRes] = useGetSingleProject();
  const openModal = useModalContext();
  const [deleteProject] = useDeleteProject();

  const handleDelete = async () => {
    confirmationDialog({
      message: "Are you sure you want to delete this project?",
      onOk: async () => {
        await deleteProject(data?.id);
      },
    });
  };

  const handleEdit = () => {
    openModal({
      title: "Update project",
      render: (close) => <ProjectModal isEditMode data={data} onClose={close} />,
    });
  };

  return (
    <Paper
      withBorder
      p={8}
      shadow="md"
      className={clsx("flex flex-col flex-grow relative")}
    >
      <LoadingWithText text="Loading project information..." show={false} />
      {!isLoading && !queryRes?.error && (
        <>
          <Flex justify="space-between" align="center" mb={12}>
            <Title size="h3">Project Details</Title>
            <Flex columnGap={12}>
              <RoleChecker nonSuperAdmin>
                <Button size="xs" onClick={handleEdit}>
                  <FaEdit />
                </Button>
              </RoleChecker>
              <RoleChecker nonSuperAdmin>
                <Button color="red" size="xs" onClick={handleDelete}>
                  <FaTrash />
                </Button>
              </RoleChecker>
            </Flex>
          </Flex>
          <ProjectDetails data={data} />
          <CustomTabs defaultValue="costing" data={InvoiceTabs} />
        </>
      )}
    </Paper>
  );
}

export default SelectedInvoice;
