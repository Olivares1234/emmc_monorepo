import useGetProfile from "hooks/useGetProfile";

export const useGetUserRole = () => {
  const profile = useGetProfile();
  return profile?.role.role;
};
