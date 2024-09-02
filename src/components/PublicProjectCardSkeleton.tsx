import ActivityCalendar, {
  Skeleton as ActivitySkeleton,
} from "react-activity-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function PublicProjectCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-6 w-64" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-center">
        <div className="grid grid-cols-[repeat(52,_1fr)] gap-0.5">
          {[...Array(364)].map((_, i) => (
            <Skeleton key={i} className="size-3 rounded-sm" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
