import React from "react"
import { Year } from "./Year"
import { Month } from "./Month"
import Outlay from "./Outlay"
import {EmptyMonthsSign} from './EmptyMonthsSign'
import PropTypes from "prop-types"
import { compose, map, reverse, prop, sum, filter, findIndex, pipe,
    tap, groupBy, isEmpty, mapObjIndexed, values, times, inc } from "ramda"
import {
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfMonth,
  endOfYear,
  getYear,
  getMonth,
  getDate,
  getDaysInMonth,
  format,
  eachWeekOfInterval,
  endOfWeek,
  eachDayOfInterval,
    addMonths
} from "date-fns"

import "../css/calendar.css"
import indexOf from "ramda/es/indexOf";

const getAmountByInterval = interval =>
  compose(sum, map(prop("amount")), filter(({ date }) => isWithinInterval(date, interval)))
const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() })
const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
const getAmountByDay = date => getAmountByInterval({ start: startOfDay(date), end: endOfDay(date) })

const Calendar = ({ year, children = () => {} }) => {
  const monthsOfYear = times(month => {
    const start = new Date(year, month, 1);
      return {
      start,
      end: endOfMonth(start)
    }
  }, 12)

  return (
    <div>

      {compose(
          map(monthInterval => (
              (findIndex(outlay =>
                  isWithinInterval(prop("date", outlay), monthInterval))(children().props.outlays)===-1) ?

                  (indexOf(monthInterval)(monthsOfYear) !== 0 &&
                      findIndex(outlay =>
                          isWithinInterval(prop("date", outlay),
                              monthsOfYear[indexOf(monthInterval)(monthsOfYear)-1]))
                      (children().props.outlays)===-1) ?

                      "" :

                      <EmptyMonthsSign /> :
                  <div>
                      <h3>{format(monthInterval.start, "MMM")} {getAmountByMonth(monthInterval.start)(children().props.outlays)}$</h3>
                      {eachWeekOfInterval(monthInterval)
                          .map(start => ({ start, end: endOfWeek(start) }))
                          .map(weekInterval => <div>{eachDayOfInterval(weekInterval).map(day =>  children(day))}</div>)}
                  </div>
          )),
          reverse(),
        filter(({ start }) => start - new Date() < 0),

        )(monthsOfYear)

      }
    </div>
  )
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
