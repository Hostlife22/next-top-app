import cn from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Input } from "..";
import GlassIcon from "./glass.svg";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = (): void => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };
  return (
    <div className={cn(styles.search, className)} {...props}>
      <Input
        className={styles.input}
        placeholder="Поиск"
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
      >
        <GlassIcon />
      </Button>
    </div>
  );
};
