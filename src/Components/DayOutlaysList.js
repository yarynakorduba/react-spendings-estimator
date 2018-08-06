import React from "react"
import { v4 } from "react-native-uuid"
import { map } from "ramda"
import Outlay from "./Outlay"
import arrow from "../images/arrow.png"

import "../css/dayOutlaysList.css"

export const DayOutlaysList = ({ outlaysOfDay, changeVisibility, onOutlayClick }) => {
  return (
    <div className="outlays">
      <div className="outlays__close-button" onClick={changeVisibility}>
        <img src={arrow} />
      </div>
      {map(outlayOfDay => (
        <Outlay
          key={v4()}
          amount={outlayOfDay.amount}
          title={outlayOfDay.title}
          id={outlayOfDay.id}
          onOutlayClick={() => onOutlayClick(outlayOfDay.id)}
        />
      ))(outlaysOfDay)}
    </div>
  )
}
