import { reportButtons } from "./constants";
import ReportButton from "./ReportButton";

const ReportButtonsContents = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 space-y-1">
      {reportButtons.map((button) => (
        <ReportButton
          key={button.label}
          color={button.color}
          code={button.code}
          className="w-full truncate flex justify-start items-center report-button mr-8"
          icon={button.icon}
          label={button.label}
        />
      ))}
    </div>
  );
};

export default ReportButtonsContents;
