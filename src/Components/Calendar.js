import React from "react"
import { v4 } from "react-native-uuid"
import { EmptyMonthsSign } from "./EmptyMonthsSign"
import PropTypes from "prop-types"
import { compose, map, reverse, prop, indexOf, filter, findIndex, times } from "ramda"
import { isWithinInterval, endOfMonth } from "date-fns"
import { Month } from "./Month"

import "../css/calendar.css"
import { getAmountByMonth } from "./GetAmountOfMoney"

const Calendar = ({ year, onOutlayClick, children = () => {} }) => {
  const monthsOfYear = times(month => {
    const start = new Date(year, month, 1)
    return {
      start,
      end: endOfMonth(start)
    }
  }, 12)

  const outlays = children().props.outlays
  return compose(
    map(
      monthInterval =>
        findIndex(outlay => isWithinInterval(prop("date", outlay), monthInterval))(outlays) === -1 ? (
          indexOf(monthInterval)(monthsOfYear) !== 0 &&
          findIndex(outlay =>
            isWithinInterval(prop("date", outlay), monthsOfYear[indexOf(monthInterval)(monthsOfYear) - 1])
          )(outlays) === -1 ? (
            ""
          ) : (
            <EmptyMonthsSign key={v4()} />
          )
        ) : (
          <Month key={v4()} title={getAmountByMonth(monthInterval.start)(outlays) + "$"} monthInterval={monthInterval}>{children}</Month>
        )
    ),
    reverse(),
    filter(({ start }) => start - new Date() < 0)
  )(monthsOfYear)
}

Calendar.contextTypes = {
  store: PropTypes.object,
  outlays: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.any.isRequired
    })
  )
}

export default Calendar
