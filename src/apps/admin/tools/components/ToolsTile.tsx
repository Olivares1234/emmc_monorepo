import { Button, Flex, Paper, Text } from "@mantine/core";

interface Props {
  title: string;
  description: string;
  onClick: (params?: any) => void;
  buttonText?: string;
  isLoading: boolean;
  loadingButtonText?: string;
}

function ToolsTile({
  title,
  description,
  onClick,
  buttonText,
  isLoading,
  loadingButtonText,
}: Props) {
  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Flex w="100%" justify="space-between" align="center">
        <Text size="xl" className="font-semibold">
          {title}
        </Text>
        <Button color="dark" onClick={onClick} loading={isLoading}>
          {!isLoading ? (
            <> {buttonText ?? "Execute"}</>
          ) : (
            <>{loadingButtonText ?? "Executing"}</>
          )}
        </Button>
      </Flex>
      <Flex direction="column" mt={24} rowGap={5}>
        <Text className="text-xl font-light">{description}</Text>
      </Flex>
    </Paper>
  );
}

export default ToolsTile;
