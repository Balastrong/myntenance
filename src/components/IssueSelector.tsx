"use client"

import { useGitHubIssues } from "@/hooks/useGitHubIssues"
import { useState } from "react"
import { AutoComplete } from "./Autocomplete"
import { Button } from "./ui/button"

type Props = {
  baseQuery?: string
  onSubmit: (issueNumber: number) => void
}

export function IssueSelector({ baseQuery, onSubmit }: Props) {
  const [searchValue, setSearchValue] = useState("")
  const [selectedValue, setSelectedValue] = useState("")
  const { data, isLoading } = useGitHubIssues(
    selectedValue ? "" : searchValue,
    baseQuery,
  )
  const items = data?.items || []

  return (
    <div>
      <form
        action={() => {
          onSubmit(Number(selectedValue))
          setSearchValue("")
          setSelectedValue("")
        }}
      >
        <div className="flex gap-2">
          <AutoComplete
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            items={items.map((item) => ({
              value: item.number + "",
              label: `#${item.number}: ${item.title}`,
            }))}
            placeholder="Search repositories..."
            isLoading={isLoading}
          />

          <Button disabled={!selectedValue}>Select</Button>
        </div>
      </form>
    </div>
  )
}
