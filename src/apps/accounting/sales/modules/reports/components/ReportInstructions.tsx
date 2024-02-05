import React from "react";

function ReportInstructions() {
  return (
    <>
      <h3>Instructions:</h3>
      <ul className="ml-1">
        <li>To export Sales, you need to provide the Conversion and Year.</li>
        <li>
          To export SOA (Statement of Accounts), you need to provide the Customer and
          Currency.
        </li>
        <li>
          To export AR (Accounts Receivable) and Sales summary report, you need to provide
          the Months, Year, and Conversion.
        </li>
        <li>To export AR weekly, you need to provide the Weeks, Year, and Conversion.</li>
      </ul>
    </>
  );
}

export default ReportInstructions;
