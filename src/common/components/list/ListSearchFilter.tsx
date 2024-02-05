import { FormEvent, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Flex, Input, Text, UnstyledButton } from "@mantine/core";
import omit from "lodash.omit";
import { useAppSelector } from "redux/hooks";
import { removeEmpty } from "utils/helpers";

import { useModalContext } from "../modal";

import { ListSearch } from "./types";

function ListSearchFilter({
  onChange,
  advanceFilterElement,
  showInputOnly,
  filterSelector,
}: ListSearch) {
  const appSelectorFilter = useAppSelector(
    typeof filterSelector === "function" ? filterSelector : () => undefined,
  );
  const filter = filterSelector ? appSelectorFilter : null;
  const [search, setSearch] = useState(filter?.search ?? "");

  const selectedFilterLength = useMemo(() => {
    if (filter && typeof filter === "object") {
      return Object.keys(removeEmpty(omit(filter, "search"))).length;
    }
    return 0;
  }, [filter]);
  const openModal = useModalContext();

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onChange({
      search,
    });
  };

  const handleClickAdvance = () => {
    const Component = advanceFilterElement ?? (() => <div />);

    openModal({
      title: "Advance filter",
      render: (close) => <Component onChange={onChange} onClose={close} />,
      size: "lg",
    });
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Flex>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full"
            placeholder="Search"
            rightSection={
              <Button
                color="gray"
                className="hover:bg-transparent"
                variant="subtle"
                ml={2}
                type="submit"
              >
                <FaSearch />
              </Button>
            }
          />
        </Flex>
      </form>
      {!showInputOnly && (
        <Flex my={2} justify="flex-end">
          <UnstyledButton px={0} onClick={handleClickAdvance}>
            <Text fw={500} size="sm">
              Advanced Filters {selectedFilterLength > 0 && `(${selectedFilterLength})`}
            </Text>
          </UnstyledButton>
        </Flex>
      )}
    </>
  );
}

export default ListSearchFilter;
