import { DatabaseClient } from "./types"

export async function getCurrentUserId(client: DatabaseClient) {
  return client.auth.getUser().then(({ data }) => data.user?.id)
}
