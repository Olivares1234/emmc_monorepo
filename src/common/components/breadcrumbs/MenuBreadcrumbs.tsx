import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, MantineNumberSize, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { startCase } from "utils/helpers";

interface Props {
  fontSize?: MantineNumberSize;
}

function MenuBreadcrumbs({ fontSize }: Props) {
  const location = useLocation();
  const [titles, setTitles] = useState<string[]>([]);

  const paths = useMemo(
    () => location.pathname?.split("/")?.filter((val) => isNaN(val as unknown as number)),
    [location],
  );

  useDocumentTitle(titles.join(" - ").toUpperCase());
  const links = useMemo(
    () =>
      paths?.map((val, i, arr) => {
        const title = startCase(val);
        return (
          <Link
            key={val}
            to={`/${arr.slice(0, i + 1).join("/")}`}
            className="menu-nav-link"
          >
            <Text size={fontSize ?? "md"}> {title}</Text>
          </Link>
        );
      }),
    [paths, fontSize],
  );

  useEffect(() => {
    setTitles(paths.map((path) => startCase(path)));
  }, [paths]);

  return (
    <Breadcrumbs mb={18}>
      <Link to="/" className="menu-nav-link">
        <Text size={fontSize ?? "md"}>Menu</Text>
      </Link>
      {links}
    </Breadcrumbs>
  );
}

export default MenuBreadcrumbs;
