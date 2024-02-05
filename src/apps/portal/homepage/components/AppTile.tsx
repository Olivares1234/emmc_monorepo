import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Flex, Paper, Text } from "@mantine/core";

interface Props {
  path: string;
  label: string;
  description?: string;
  icon: IconType;
  isDisabled?: boolean;
}

function AppTile({ path, label, icon: Icon, description, isDisabled }: Props) {
  const nav = useNavigate();
  const handleClick = () => nav(path?.replace("/*", ""));

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Flex w="100%" justify="space-between" align="center">
        <Avatar color="teal" size="md">
          <Icon size={25} />
        </Avatar>
        <Button color="dark" size="xs" onClick={handleClick} disabled={isDisabled}>
          <Text>OPEN</Text>{" "}
        </Button>
      </Flex>
      <Flex direction="column" mt={4} rowGap={5}>
        <Text size="lg" className="font-semibold">
          {label}
        </Text>
        <Text className="text-lg font-light">
          {description ?? "No description available"}
        </Text>
      </Flex>
    </Paper>
  );
}

export default AppTile;
