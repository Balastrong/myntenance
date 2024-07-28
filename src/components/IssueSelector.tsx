"use client";

import { storeRepository } from "@/app/api/github/actions";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { AutoComplete } from "./Autocomplete";
import { Button } from "./ui/button";
import { useGitHubIssues } from "@/hooks/useGitHubIssues";

export const initialState = {
  message: "",
  error: false,
};

type Props = {
  baseQuery?: string;
};

export function IssueSelector({ baseQuery }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const { data, isLoading } = useGitHubIssues(searchValue, baseQuery);
  const items = data?.items || [];

  const storeWithRepo = storeRepository.bind(null, selectedValue);

  const [state, formAction] = useFormState(storeWithRepo, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
    }
  }, [state.error, state.message]);

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          setSearchValue("");
          setSelectedValue("");
          //formAction();
        }}
      >
        <div className="flex gap-2">
          <div className="w-80">
            <AutoComplete
              selectedValue={selectedValue}
              onSelectedValueChange={setSelectedValue}
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={items.map((item) => ({
                value: item.id + "",
                label: `#${item.number}: ${item.title}`,
              }))}
              placeholder="Search repositories..."
              isLoading={isLoading}
            />
          </div>

          <Button disabled={!selectedValue}>Select</Button>
        </div>
      </form>
    </div>
  );
}
