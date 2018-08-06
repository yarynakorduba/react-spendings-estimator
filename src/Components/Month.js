import React, { Fragment } from "react"
import { format, eachDayOfInterval, endOfWeek, eachWeekOfInterval } from "date-fns"
import { v4 } from "react-native-uuid"

import "../css/month.css"

import { getAmountByMonth } from "./GetAmountOfMoney"

export const Month = ({ monthInterval, outlays, days }) => {
  return (
    <Fragment>
      <h3 key={v4()}>
        {format(monthInterval.start, "MMM")}{" "}
        <span className="month__money-amount">{getAmountByMonth(monthInterval.start)(outlays)}$</span>
      </h3>
      {eachWeekOfInterval(monthInterval)
        .map(start => ({ start, end: endOfWeek(start) }))
        .map(weekInterval => (
          <div key={v4()}>
            {eachDayOfInterval(weekInterval).map(day => <Fragment key={v4()}>{days(day)}</Fragment>)}
          </div>
        ))}
    </Fragment>
  )
}
