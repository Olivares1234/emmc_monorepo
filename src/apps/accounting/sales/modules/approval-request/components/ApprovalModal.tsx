import { useMemo } from "react";
import { Flex } from "@mantine/core";
import { ModalButtons } from "common/components/modal";
import { ORGANIZATION_APPROVER } from "common/components/roles/constants";
import RoleChecker from "common/components/roles/RoleChecker";
import { Table } from "common/components/table";
import { FormModal } from "common/types";
import { startCase } from "utils/helpers";

import { useApproveRequest } from "../hooks";
import { Approval } from "../types";

import { approvalTableFormat } from "./constants";

function ApprovalModal({ onClose, data }: FormModal<Approval>) {
  const [submit, isLoading] = useApproveRequest();

  const handleSubmit = async () => {
    try {
      await submit(data ?? {});
      onClose();
    } catch (e) {
      //
    }
  };

  const formattedData = useMemo(() => {
    const value = data?.difference;
    return Object.keys(value ?? {})?.map((key) => ({
      label: startCase(key),
      old: value?.[key]?.old,
      new: value?.[key]?.new,
    }));
  }, [data?.difference]);

  return (
    <Flex direction="column" h={400}>
      <Table format={approvalTableFormat} data={formattedData} />
      <RoleChecker allowedRoles={ORGANIZATION_APPROVER}>
        {!data?.is_approved && (
          <ModalButtons
            isLoading={isLoading}
            onOk={handleSubmit}
            okLabel="Approve"
            onCancel={onClose}
          />
        )}
      </RoleChecker>
    </Flex>
  );
}

export default ApprovalModal;
