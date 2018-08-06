import React, { Component } from "react"
import { format, isSameDay } from "date-fns"
import { v4 } from "react-native-uuid"
import { sum } from "ramda"
import { DayOutlaysList } from "./DayOutlaysList"

import "../css/day.css"

const Day = ({ day, outlays, onOutlayClick }) => {
  const changeVisibility = ({ target }) => {
    const openedPopups = Array.from(document.getElementsByClassName("outlays")).forEach(openedPopup => {
      let classLst = openedPopup.classList
      openedPopup != target.nextSibling
        ? (openedPopup.previousSibling.classList.remove("day__money-amount--top"), classLst.remove("outlays--visible"))
        : !target.nextSibling.classList.contains("outlays--visible")
          ? (target.nextSibling.classList.add("outlays--visible"), (target.className += " day__money-amount--top"))
          : target.nextSibling.classList.remove("outlays--visible")
    })
  }

  const outlaysOfDay = outlays.filter(({ date }) => isSameDay(date, day))
  return outlaysOfDay.length > 0 ? (
    <span key={v4()} className="day day--active">
      {format(day, "d")}
      <div key={v4()} className="day__money-amount" onClick={changeVisibility}>
        {sum(outlaysOfDay.map(({ amount }) => amount))}
      </div>
      <DayOutlaysList changeVisibility={changeVisibility} outlaysOfDay={outlaysOfDay} onOutlayClick={onOutlayClick} />
    </span>
  ) : (
    <span key={v4()} className={"day"}>
      {" "}
      {format(day, "d")}
    </span>
  )
}

export default Day
