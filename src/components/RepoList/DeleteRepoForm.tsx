"use client"
import { handleDelete } from "./actions"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function DeleteRepoForm({ repoId }: { repoId: string }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      await handleDelete(formData)

      toast.success("Repository deleted successfully.")
    } catch (error) {
      console.error("Failed to delete the repository:", error)
      alert("Failed to delete the repository.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={repoId} />
      <Button size={"sm"} variant={"destructive"} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
      </Button>
    </form>
  )
}
