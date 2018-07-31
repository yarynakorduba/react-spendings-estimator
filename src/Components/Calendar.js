import React from "react"
import { Year } from "./Year"
import { Month } from "./Month"
import Day from "./Day"
import Outlay from "./Outlay"
import PropTypes from "prop-types"
import { compose, map, reverse, prop, sum, filter, groupBy, isEmpty, mapObjIndexed, values } from "ramda"
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
  getDaysInMonth
} from "date-fns"

const getAmountByInterval = interval =>
  compose(
    sum,
    map(prop("amount")),
    filter(({ date }) => isWithinInterval(date, interval))
  )
const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() })
const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
const getAmountByDay = date => getAmountByInterval({ start: startOfDay(date), end: endOfDay(date) })
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const iterateBy = (groupingFn, iteratorFn) =>
  compose(
    //prettier-ignore
    reverse,
    values,
    mapObjIndexed(iteratorFn),
    groupBy(({ date }) => groupingFn(date))
  )
const filterMonth = month => item => {
  return getMonth(new Date(item.date)) === month
}

const filterDay = day => item => {
  return getDate(new Date(item.date)) === day
}

const iterByDay = items =>
  compose(
    map(day => (
      <Day
        key={day.key}
        date={new Date(0, 0, day.key)}
        titleLabel={isEmpty(day.value) ? 0 : getAmountByDay(day.value[0].date)(items.value)}
      >
        {isEmpty(day.value)
          ? ""
          : map(outlay => <Outlay key={outlay.id} amount={outlay.amount} id={outlay.id} title={outlay.title} />)(
              day.value
            )}
      </Day>
    )),
    map(day => {
      return { key: day, value: filter(filterDay(day), items.value) }
    })
  )

const generateNumberArray = number => {
  let result = Array(number)

  for (let i = 0; i < number; i++) {
    result[i] = i + 1
  }
  return result
}

const iterByMonth = items =>
  compose(
    map(month => (
      <Month
        key={month.key}
        date={new Date(getYear(items[0].date), month.key, 0)}
        titleLabel={isEmpty(month.value) ? 0 : getAmountByMonth(month.value[0].date)(items)}
      >
        {iterByDay(month)(generateNumberArray(getDaysInMonth(new Date(getYear(items[0].date), month.key, 0))))}
      </Month>
    )),
    map(month => {
      return { key: month, value: filter(filterMonth(month), items) }
    })
  )

const Calendar = ({ outlays }) => (
  <div className="outlay--list">
    <h3>Total amount spent: {getTotalAmount(outlays)}$</h3>
    {iterateBy(getYear, items => (
      <Year key={items[0].date} date={items[0].date} titleLabel={getAmountByYear(items[0].date)(items)}>
        {iterByMonth(items)(months)}
      </Year>
    ))(outlays)}
  </div>
)

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
