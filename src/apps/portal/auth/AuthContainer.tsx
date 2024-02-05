import { Button, Divider, Image, Notification, Switch, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useDocumentTitle } from "@mantine/hooks";
import FinanceSvg from "assets/img/finance.svg";
import ThemeButton from "common/components/layout/components/ThemeButton";
import * as yup from "yup";

import { useLogin } from "./hooks";

const schema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().label("Password"),
});

function AuthContainer(): JSX.Element {
  const [login, isLoading, error] = useLogin();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: yupResolver(schema),
  });
  useDocumentTitle("EMMC SYSTEMS - LOGIN");
  return (
    <div className="flex flex-grow">
      <div className="w-full hidden md:flex justify-center items-center p-16">
        <Image src={FinanceSvg} maw={1278} />
      </div>
      <Divider orientation="vertical" />
      <div className="flex-shrink-0 shadow w-full md:max-w-lg flex flex-col sm:px-8 justify-center">
        <div className="absolute top-2 right-0">
          <ThemeButton />
        </div>
        <form
          onSubmit={form.onSubmit(async (payload) => await login(payload))}
          className="p-4 w-full rounded-lg space-y-4"
        >
          <h1 className="font-thin tracking-tightest">Welcome!</h1>
          {error && (
            <Notification title="Login failed" color="red" withCloseButton={false}>
              {error}
            </Notification>
          )}
          <TextInput
            withAsterisk
            label="Email"
            placeholder="juandelacruz@mail.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Password"
            type="password"
            placeholder="********"
            {...form.getInputProps("password")}
          />
          <Switch
            checked={form.values.rememberMe}
            onChange={(e) => form.setFieldValue("rememberMe", e.target.checked)}
            label="Remember me?"
          />
          <Button color="teal" type="submit" loading={isLoading} fullWidth>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
export default AuthContainer;
