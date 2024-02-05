import React, { useMemo, useState } from "react";
import { AppShell, clsx, Footer, useMantineTheme } from "@mantine/core";
import { AnyObject } from "common/types";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { LayoutTypes } from "./types";

export default function LayoutContainer({
  children,
  navMenu,
  footer,
  title,
}: LayoutTypes) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const styles = useMemo(
    () => ({
      main: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : "#fff",
        padding: 0,
      },
    }),
    [theme],
  );

  const shellProps = useMemo(() => {
    const props: AnyObject = {};

    if (navMenu && navMenu.length > 0)
      props.navbar = <Navbar menu={navMenu} opened={opened} />;

    if (footer)
      props.footer = (
        <Footer height={50} p="md">
          {footer}
        </Footer>
      );

    return props;
  }, [navMenu, footer, opened]);

  return (
    <AppShell
      styles={styles}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={<Header setOpened={setOpened} opened={opened} title={title} />}
      {...shellProps}
    >
      <div
        className={clsx(
          "w-full flex flex-col h-full pt-24 layout-body",
          shellProps?.navbar ? "pl-0 ml-2 md:ml-0 md:pl-40 xl:pl-64" : "",
          shellProps?.footer ? "pb-4" : "",
        )}
      >
        {children}
      </div>
    </AppShell>
  );
}
