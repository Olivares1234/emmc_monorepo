import { NavigateFunction, useNavigate } from "react-router-dom";

export const history: {
  navigate: NavigateFunction;
  push: NavigateFunction;
} = {
  navigate: (_p: any, ..._r: any) => {
    //
  },
  push: (page: any, ...rest: any) => history.navigate(page, ...rest),
};

export const SetNavigator = () => {
  history.navigate = useNavigate();

  return null;
};
