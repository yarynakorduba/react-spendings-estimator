import React from "react"
import { compose, map, keys, path, reverse, sortBy, prop, tap, sum, filter } from "ramda"
import { v1 } from "react-native-uuid"
import {
  format,
  isSameYear,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfYear,
  endOfDay,
  endOfMonth,
  endOfYear
} from "date-fns"

const Outlay = ({ amount, title, id, onDeleteOutlay }) => (
  <div className="container__spending" key={v1()}>
    {amount}
    $&nbsp;{title}
    <button className="item__button" onClick={() => onDeleteOutlay(id)}>
      x
    </button>
  </div>
)

const Day = ({ date, titleLabel, children }) => (
  <div className="container__day" key={v1()}>
    <div className="container__heading--small">
      {format(date, "d, eee")}&nbsp; ({titleLabel}$)
    </div>
    {children}
  </div>
)

const Month = ({ date, titleLabel, children }) => (
  <div className="container__month" key={v1()}>
    <div className="container__heading--small">
      {format(date, "MMMM")}&nbsp; ({titleLabel}$)
    </div>
    {children}
  </div>
)

const Year = ({ year, titleLabel, children }) => (
  <div className="container__year" key={v1()}>
    <div className="container__heading--small">
      {year}&nbsp; ({titleLabel}$)
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

const Calendar = ({ cost_list, rawData, deleteOutlay }) => {
  return !cost_list ? null : (
    <div className="container">
      <h3>Total amount spent: {getTotalAmount(rawData) || "..."}$</h3>

      {compose(
        map(year => {
          const date = new Date(year)

          return (
            <Year year={year} titleLabel={getAmountByYear(date)(rawData)}>
              {compose(
                map(month => {
                  const date = new Date(year, month)
                  return (
                    <Month date={date} titleLabel={getAmountByMonth(date)(rawData)}>
                      {compose(
                        map(day => {
                          const date = new Date(year, month, day)
                          return (
                            <Day date={date} titleLabel={getAmountByDay(date)(rawData)}>
                              {compose(
                                map(({ amount, id, title }) => (
                                  <Outlay amount={amount} id={id} title={title} onDeleteOutlay={deleteOutlay} />
                                )),
                                reverse(),
                                path([year, month, day])
                              )(cost_list)}
                            </Day>
                          )
                        }),
                        reverse(),
                        keys,
                        path([year, month])
                      )(cost_list)}
                    </Month>
                  )
                }),
                reverse(),
                keys,
                path([year])
              )(cost_list)}
            </Year>
          )
        }),
        sortBy(prop("date")),
        reverse(),
        keys
      )(cost_list)}
    </div>
  )
}

export default Calendar
