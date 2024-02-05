import { selectProfile } from "apps/portal/auth/redux/selectors";
import { useAppSelector } from "redux/hooks";

const useGetProfile = () => useAppSelector(selectProfile);
export default useGetProfile;
