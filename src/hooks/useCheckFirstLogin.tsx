import { useEffect } from "react";
import ChangePasswordForm from "apps/portal/auth/components/ChangePasswordForm";
import { useModalContext } from "common/components/modal";
import supabase from "utils/supabase";

const useCheckFirstLogin = (): void => {
  const modal = useModalContext();

  useEffect(() => {
    const checkIfFirstLogin = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user && data?.user?.user_metadata?.isFirstLoggedIn) {
        modal({
          title: "Change Password",
          render: (close) => <ChangePasswordForm onClose={close} isFirstLoggedIn />,
          modalProps: {
            closeOnClickOutside: false,
            withCloseButton: false,
          },
        });
      }
    };

    checkIfFirstLogin();
  }, []);
};

export default useCheckFirstLogin;
