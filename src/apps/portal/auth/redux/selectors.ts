import { TRootState } from "redux/store";

export const selectIsAuth = (state: TRootState) => state.auth.isAuth;
export const selectProfile = (state: TRootState) => state.auth.profile;
