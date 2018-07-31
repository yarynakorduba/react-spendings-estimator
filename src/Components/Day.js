import React, { Component } from "react"
import {format, isSameDay} from "date-fns"
import "../css/day.css"

import {sum} from "ramda";
export const Day = ({ day, outlays }) => {
    const outlaysOfDay = outlays.filter(({ date }) => isSameDay(date, day))

    return outlaysOfDay.length > 0 ? (
        <span className={"day day--active"}>
      {format(day, "d")}
            <div className={"outlay"}>{sum(outlaysOfDay.map(({ amount }) => amount))}</div>
    </span>
    ) : (
        <span className={"day"} > {format(day, "d")}</span>
    )
}