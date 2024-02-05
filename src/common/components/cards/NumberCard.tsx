import { Paper, Text, Title } from "@mantine/core";

import { NumberCardProps } from "./types";

function NumberCard({ title, value, paperProps }: NumberCardProps) {
  return (
    <Paper
      className="flex flex-col"
      withBorder
      radius={5}
      px={14}
      py={10}
      {...(paperProps ?? {})}
    >
      <Title size="h3" fw="">
        {title}
      </Title>
      <Text mt={8} size="xl" fw="normal">
        {value?.toLocaleString()}
      </Text>
    </Paper>
  );
}

export default NumberCard;
