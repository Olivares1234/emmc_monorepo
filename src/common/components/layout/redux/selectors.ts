import { TRootState } from "redux/store";

export const selectScheme = (state: TRootState) => state.layout.color;
