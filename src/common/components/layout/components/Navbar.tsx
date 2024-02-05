import { NavLink, useResolvedPath } from "react-router-dom";
import { clsx, Navbar } from "@mantine/core";
import { useAppSelector } from "redux/hooks";

import { selectScheme } from "../redux/selectors";
import { LayoutTypes } from "../types";

interface Props {
  opened: boolean;
  menu: LayoutTypes["navMenu"];
}

function Nav({ opened, menu }: Props) {
  const url = useResolvedPath("").pathname;
  const scheme = useAppSelector(selectScheme);
  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 150, lg: 250 }}
      className={clsx("navbar", scheme === "light" ? "light" : "dark")}
    >
      {menu?.map((nav) => (
        <NavLink
          end={nav.path === ""}
          key={nav.path}
          to={`${url}${nav.path.replace("/*", "")}`}
          className="nav-link"
        >
          {nav.label}
        </NavLink>
      ))}
    </Navbar>
  );
}

export default Nav;
