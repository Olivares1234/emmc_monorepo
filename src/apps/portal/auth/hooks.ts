import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "common/components/toast";
import { AnyObject, ApiResponse } from "common/types";
import useFetchProfile from "hooks/useFetchProfile";
import api from "utils/api";
import supabase from "utils/supabase";

import { setAuth } from "./redux/authSlice";
import { LoginHook, LoginPayload } from "./types";

export const useLogin = (): LoginHook => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const fetchProfile = useFetchProfile();
  const [error, setError] = useState("");

  const login = async (payload: LoginPayload) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword(payload);
      if (error) throw new Error(error.message);
      await fetchProfile();
      dispatch(setAuth(true));
    } catch (e) {
      setError((e as Record<string, string>)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [login, isLoading, error];
};

export const useUpdatePassword = (): [(payload: AnyObject) => Promise<any>, boolean] => {
  const { mutateAsync, isLoading } = useMutation(
    ["ROLES"],
    async (payload: AnyObject) => {
      try {
        const { data }: AxiosResponse<ApiResponse> = await api.put(
          "/auth/users/update-password",
          payload,
        );
        await supabase.auth.refreshSession();
        openToast({
          type: "success",
          message: data?.message ?? "",
        });
      } catch (e) {
        return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
      }
    },
  );
  return [mutateAsync, isLoading];
};
