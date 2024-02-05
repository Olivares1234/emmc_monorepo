import { useEffect } from "react";
import { Loader } from "@mantine/core";
import supabase from "utils/supabase";

function LoggingOut() {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      location.href = "/";
    };

    logout();
  }, []);

  return (
    <div className="flex flex-grow relative flex-col items-center justify-center">
      <h1 className="font-thin">Logging out...</h1>
      <Loader color="teal" />
    </div>
  );
}

export default LoggingOut;
