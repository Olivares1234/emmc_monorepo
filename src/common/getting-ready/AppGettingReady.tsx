import { Loader } from "@mantine/core";

function AppGettingReady() {
  return (
    <div className="flex flex-grow relative flex-col items-center justify-center">
      <h1 className="font-thin">App is getting ready...</h1>
      <Loader color="teal" />
    </div>
  );
}

export default AppGettingReady;
