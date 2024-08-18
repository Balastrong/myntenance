"use client"

import { useGitHubIssues } from "@/hooks/useGitHubIssues"
import { useState } from "react"
import { useFormStatus } from "react-dom"
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
            placeholder="Search issues..."
            isLoading={isLoading}
          />

          <SubmitButton disabled={!selectedValue} />
        </div>
      </form>
    </div>
  )
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={disabled || pending}>
      Submit
    </Button>
  )
}
