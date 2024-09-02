"use client"

import { useTheme } from "next-themes"
import Calendar, {
  ThemeInput,
  type Props as ActivityCalendarProps, //Skeleton,
} from "react-activity-calendar"

const minimalTheme: ThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
}

type Props = {} & ActivityCalendarProps

// TODO: Add a skeleton loader
export function ActivityCalendar({ data }: Props) {
  const { resolvedTheme: colorScheme } = useTheme()

  return data.length > 0 ? (
    <Calendar
      data={data}
      colorScheme={colorScheme === "dark" ? "dark" : "light"}
      theme={minimalTheme}
      blockSize={10}
      labels={{
        totalCount: `{{count}} commits in the last ${data.length} days`,
      }}
    />
  ) : null
}
