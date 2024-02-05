import { Image } from "@mantine/core";
import NoDataImg from "assets/img/no-data.svg";

interface Props {
  message?: string;
  hideIcon?: boolean;
}

function NoDataContainer({ message, hideIcon }: Props) {
  return (
    <div className="flex flex-grow justify-center items-center flex-col">
      {!hideIcon && <Image src={NoDataImg} width="100%" maw={150} />}
      <div className="m-12 text-lg  text-center">{message ?? "No Data"}</div>
    </div>
  );
}

export default NoDataContainer;
