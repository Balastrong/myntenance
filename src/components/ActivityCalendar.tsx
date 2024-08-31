"use client"

import Calendar, {
  ThemeInput,
  type Props as ActivityCalendarProps, //Skeleton,
} from "react-activity-calendar"

const gitHubColors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

const minimalTheme: ThemeInput = {
  light: gitHubColors,
  dark: gitHubColors,
}

type Props = {} & ActivityCalendarProps

// TODO: Add a skeleton loader
export function ActivityCalendar({ data }: Props) {
  return data.length > 0 ? (
    <Calendar
      data={data}
      theme={minimalTheme}
      blockSize={10}
      labels={{
        totalCount: `{{count}} commits in the last ${data.length} days`,
      }}
    />
  ) : null
}
