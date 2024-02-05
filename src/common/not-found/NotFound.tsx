import { Link } from "react-router-dom";
import { Image } from "@mantine/core";
import NotFoundImg from "assets/img/404.svg";

function NotFound() {
  return (
    <div className="flex flex-grow justify-center items-center flex-col">
      <Image src={NotFoundImg} width="100%" maw={800} />
      <Link to="/" className="uppercase mt-4 no-underline text-forest-500">
        Go back to home
      </Link>
    </div>
  );
}

export default NotFound;
