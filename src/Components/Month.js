import React, { Fragment } from "react"
import { format, eachDayOfInterval, endOfWeek, eachWeekOfInterval } from "date-fns"
import { renderComponent } from "recompose"
import "../css/month.css"

export const Month = ({ monthInterval, title, children }) => (
  <Fragment>
    <h3>

      {format(monthInterval.start, "MMM")} <span className="month__money-amount">{renderComponent(title)()()}</span>
    </h3>
    <div style={{ overflow: "hidden", margin: "auto", width: 280 }}>
      {eachWeekOfInterval(monthInterval)
        .map(start => ({ start, end: endOfWeek(start) }))
        .map((weekInterval, i) => (
          <div key={i}>
            {eachDayOfInterval(weekInterval).map(day => (
              <div
                style={{
                  float: "left",
                  height: 40,
                  width: 40
                }}
              >
                {children(day)}
              </div>
            ))}
          </div>
        ))}
    </div>
  </Fragment>
)
