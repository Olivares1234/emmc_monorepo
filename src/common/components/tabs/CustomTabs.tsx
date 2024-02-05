import React, { useMemo, useState } from "react";
import { Flex, Tabs } from "@mantine/core";

interface TabData {
  value: string;
  label: string;
  component: JSX.Element;
}

interface CustomTabsProps {
  data: TabData[];
  defaultValue?: string;
}

function CustomTabs({ data, defaultValue }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultValue ?? data?.[0]?.value);

  const content = useMemo(() => {
    const active = data.find((d) => d.value === activeTab);
    if (active) return active?.component;

    return <div>Invalid tab content</div>;
  }, [activeTab]);

  return (
    <Tabs
      variant="outline"
      onTabChange={(val) => setActiveTab(val as string)}
      value={activeTab}
      className="flex-grow flex flex-col mt-4"
    >
      <Tabs.List>
        {data.map((d) => (
          <Tabs.Tab key={d.value} value={d.value}>
            {d.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Flex className="flex-grow" direction="column">
        {content}
      </Flex>
    </Tabs>
  );
}

export default CustomTabs;
