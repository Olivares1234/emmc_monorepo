import { Loader } from "@mantine/core";

interface Props {
  show: boolean;
  text?: string;
}

function LoaderWithText({ show, text }: Props) {
  if (!show) return <></>;
  return (
    <div className="flex flex-grow relative flex-col items-center justify-center">
      <h1 className="font-thin">{text ?? "Loading..."}</h1>
      <Loader color="teal" />
    </div>
  );
}

export default LoaderWithText;
