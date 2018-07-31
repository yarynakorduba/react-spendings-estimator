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
      {pipe( ///perepysaty cheres compose
        filter(({ start }) => start - new Date() < 0),
        reverse(),
        map(montInterval => (
            (findIndex(outlay =>
                isWithinInterval(prop("date", outlay), montInterval))(children().props.outlays)===-1) ?
                (indexOf(montInterval)(monthsOfYear) !== 0 &&
                    findIndex(outlay =>
                    isWithinInterval(prop("date", outlay),
                        monthsOfYear[indexOf(montInterval)(monthsOfYear)-1]))
                (children().props.outlays)===-1) ?
                "" :
                    <EmptyMonthsSign /> :
          <div>
            <h3>{format(montInterval.start, "MMM")}</h3>
            {eachWeekOfInterval(montInterval)
              .map(start => ({ start, end: endOfWeek(start) }))
              .map(weekInterval => <div>{eachDayOfInterval(weekInterval).map(day =>  children(day))}</div>)}
          </div>
        )))(monthsOfYear)

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
