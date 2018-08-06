import { compose, filter, map, prop, sum } from "ramda"
import { endOfMonth, endOfYear, isWithinInterval, startOfMonth, startOfYear } from "date-fns"

export const getAmountByInterval = interval =>
  compose(
    sum,
    map(prop("amount")),
    filter(({ date }) => isWithinInterval(date, interval))
  )
export const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() })
export const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
export const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
