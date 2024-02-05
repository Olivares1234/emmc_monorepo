import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { TDispatch, TRootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch: () => TDispatch = useDispatch;
