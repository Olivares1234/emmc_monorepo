import { Link } from "react-router-dom";
import { Image } from "@mantine/core";
import UnderDevImg from "assets/img/under-development.svg";

function UnderDevelopmentContainer() {
  return (
    <div className="flex flex-grow justify-center items-center flex-col">
      <Image src={UnderDevImg} width="100%" maw={600} />
      <div className="m-12 text-lg  text-center">
        This page is under development!
        <br />
        <Link to="/" className="ml-2  mt-4 no-underline text-forest-500">
          Go back to home
        </Link>
      </div>
    </div>
  );
}

export default UnderDevelopmentContainer;
