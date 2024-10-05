"use client"

import { useTheme } from "next-themes"
import Calendar, {
  ThemeInput,
  type Props as ActivityCalendarProps,
} from "react-activity-calendar"

const minimalTheme: ThemeInput = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
}

type Props = ActivityCalendarProps

export function ActivityCalendar(props: Props) {
  const { resolvedTheme: colorScheme } = useTheme()

  return props.data.length > 0 ? (
    <Calendar
      colorScheme={colorScheme === "dark" ? "dark" : "light"}
      theme={minimalTheme}
      blockSize={10}
      blockMargin={1.7}
      labels={{
        totalCount: `{{count}} commits in the last ${props.data.length} days`,
      }}
      {...props}
    />
  ) : null
}
