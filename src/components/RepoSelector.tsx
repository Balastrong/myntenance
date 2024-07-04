"use client";

import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import * as React from "react";
import { useState } from "react";
import { AutoComplete } from "./Autocomplete";
import { Button } from "./ui/button";

export function RepoSelector() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const { data, isLoading } = useGitHubRepositories(searchValue);
  const items = data?.items || [];

  return (
    <div>
      <h2>Select a repository</h2>
      <div className="flex gap-2">
        <div className="w-80">
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            items={items.map((item) => ({
              value: item.name,
              label: item.name,
            }))}
            placeholder="Search repositories..."
            isLoading={isLoading}
          />
        </div>
        <Button disabled={!selectedValue}>Select</Button>
      </div>
    </div>
  );
}
