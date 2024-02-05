import { selectScheme } from "common/components/layout/redux/selectors";
import { useAppSelector } from "redux/hooks";

export const useGetColorScheme = () => useAppSelector(selectScheme);
