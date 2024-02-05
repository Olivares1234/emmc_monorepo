import { useDispatch } from "react-redux";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { setProfile } from "apps/portal/auth/redux/authSlice";
import { UserProfile } from "apps/portal/auth/types";
import { AxiosError, AxiosResponse } from "axios";
import { USER_PROFILE } from "common/constants";
import { AnyObject, ApiResponse } from "common/types";
import api from "utils/api";

const useFetchProfile = (): UseMutateAsyncFunction => {
  const dispatch = useDispatch();
  const { mutateAsync } = useMutation([USER_PROFILE], async () => {
    try {
      const { data }: AxiosResponse<ApiResponse<UserProfile>> = await api.get(
        "/auth/users/profile/current",
      );
      dispatch(setProfile(data.data));
    } catch (e) {
      return await Promise.reject((e as AxiosError<AnyObject>)?.response?.data);
    }
  });

  return mutateAsync;
};

export default useFetchProfile;
