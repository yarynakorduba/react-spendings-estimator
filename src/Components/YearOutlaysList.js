import React, { Fragment } from "react"
import { withProps, renderComponent, branch } from "recompose"
import { compose, times, map, filter } from "ramda"
import { withOutlays } from "./HOC"
import { format, isWithinInterval, isSameDay } from "date-fns"

import { endOfMonth } from "date-fns"
import { Month } from "./Month"
import Loading from "./Loading"

//prettier-ignore
const Outlay = ({outlays, day}) => compose(
  map(({ amount }) => <span style={{background: "gold"}}>{amount}</span>),
  filter(({ date }) => isSameDay(date, day))
)(outlays)

const EnhancedOutlay = withOutlays(Outlay)

const Title = () => <span style={{background: "blue"}}>Tada</span>

const YearOutlaysList = ({ months }) =>
  months.map(
    month =>
      month ? (
        <Month title={Title} monthInterval={month}>
          {day => (
            <Fragment>
              <EnhancedOutlay day={day}/>
              {format(day, "d")}
            </Fragment>
          )}
        </Month>
      ) : (
        <div>======</div>
      )
  )

const enhance = compose(
  withOutlays,
  branch(({ isFetching, outlays }) => isFetching && outlays.length === 0, renderComponent(Loading)),

  withProps(({ outlays, year }) => ({
    months: compose(
      map(month => (outlays.findIndex(({ date }) => isWithinInterval(date, month)) >= 0 ? month : null)),
      times(month => {
        const start = new Date(year, month, 1)
        return {
          start,
          end: endOfMonth(start)
        }
      })
    )(12)
  }))
)

export default enhance(YearOutlaysList)
