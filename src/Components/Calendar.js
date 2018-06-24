import React from "react"
import { compose, map, reverse, prop, sum, filter, groupBy, mapObjIndexed, values } from "ramda"
import {
  format,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfMonth,
  endOfYear,
  getYear,
  getMonth,
  getDate
} from "date-fns"

const Outlay = ({ amount, title, id, onDeleteOutlay }) => (
  <div className="container__spending">
    {amount}
    $&nbsp;{title}
    <button className="item__button" onClick={() => onDeleteOutlay(id)}>
      x
    </button>
  </div>
)

const Day = ({ date, titleLabel, children }) => (
  <div className="container__day">
    <div className="container__heading--small">
      {format(date, "d, eee")}&nbsp; ({titleLabel}$)
    </div>
    {children}
  </div>
)

const Month = ({ date, titleLabel, children }) => (
  <div className="container__month">
    <div className="container__heading--small">
      {format(date, "MMMM")}&nbsp; ({titleLabel}$)
    </div>
    {children}
  </div>
)

const Year = ({ date, titleLabel, children }) => (
  <div className="container__year">
    <div className="container__heading--small">
      {format(date, "yyyy")}&nbsp; ({titleLabel}$)
    </div>
    {children}
  </div>
)

//prettier-ignore
const getAmountByInterval = interval =>  compose(
  sum,
  map(prop("amount")),
  filter(({ date }) => isWithinInterval(date, interval))
)

const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() })
const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
const getAmountByDay = date => getAmountByInterval({ start: startOfDay(date), end: endOfDay(date) })

const iterateBy = (groupingFn, iteratorFn) =>
  compose(
    //prettier-ignore
    reverse,
    values,
    mapObjIndexed(iteratorFn),
    groupBy(({ date }) => groupingFn(date))
  )

const Calendar = ({ rawData, deleteOutlay }) =>
  !rawData ? null : (
    <div className="container">
      <h3>Total amount spent: {getTotalAmount(rawData) || "..."}$</h3>

      {iterateBy(getYear, items => (
        <Year key={items[0].date} date={items[0].date} titleLabel={getAmountByYear(items[0].date)(items)}>
          {iterateBy(getMonth, items => (
            <Month key={items[0].date} date={items[0].date} titleLabel={getAmountByMonth(items[0].date)(items)}>
              {iterateBy(getDate, items => (
                <Day key={items[0].date} date={items[0].date} titleLabel={getAmountByDay(items[0].date)(items)}>
                  {map(
                    ({ amount, id, title }) => (
                      <Outlay key={id} amount={amount} id={id} title={title} onDeleteOutlay={deleteOutlay} />
                    ),
                    items
                  )}
                </Day>
              ))(items)}
            </Month>
          ))(items)}
        </Year>
      ))(rawData)}
    </div>
  )

export default Calendar
