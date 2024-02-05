import React from "react";
import { Button } from "@mantine/core";
import { setSelectedReport, TSalesState } from "apps/accounting/sales/redux/salesSlice";
import { useAppDispatch } from "redux/hooks";

interface ReportButtonProps {
  color: string;
  className: string;
  icon: React.ReactNode;
  label: string;
  code: TSalesState["selectedReport"];
}

const ReportButton: React.FC<ReportButtonProps> = ({
  color,
  className,
  icon,
  label,
  code,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => dispatch(setSelectedReport(code))}
      color={color}
      className={`report-button text-sm ${className}`}
    >
      {icon}
      {label}
    </Button>
  );
};

export default ReportButton;
