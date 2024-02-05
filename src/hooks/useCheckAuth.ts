import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "apps/portal/auth/redux/authSlice";
import supabase from "utils/supabase";

import useFetchProfile from "./useFetchProfile";

const useCheckAuth = (): boolean => {
  const dispatch = useDispatch();
  const [isAppReady, setAppReady] = useState(false);
  const getProfile = useFetchProfile();

  useEffect(() => {
    const checkIfAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        try {
          await getProfile();
          dispatch(setAuth(true));
        } catch (_e) {
          //
        }
      }
      setAppReady(true);
    };

    checkIfAuth();
  }, []);

  return isAppReady;
};

export default useCheckAuth;
