import { AnyObject } from "common/types";

function FormDebugger({ data }: { data: AnyObject }) {
  return (
    <pre
      style={{
        fontSize: ".65rem",
        padding: "3px",
        border: `1px solid black`,
      }}
    >
      <strong>props</strong> = {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default FormDebugger;
