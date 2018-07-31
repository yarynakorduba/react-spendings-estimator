import React, { Component } from "react"
import { format } from "date-fns"
import "../css/day.css"
class Day extends Component {
  constructor(props) {
    super()
    this.state = {
      visible: false
    }
  }

  changeVisibility() {
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  categorizeOutlay() {
    const { titleLabel } = this.props
    var category = "day__heading day__heading"
    category +=
      titleLabel === 0
        ? "--costless"
        : titleLabel < 10
          ? "--minimal"
          : titleLabel < 30
            ? "--average"
            : titleLabel < 60
              ? "--high"
              : "--very-high"
    return category
  }
  render() {
    const { date, titleLabel, children } = this.props
    const { visible } = this.state

    return (
      <span className="calendar__day">
        <div className={this.categorizeOutlay()} onClick={() => this.changeVisibility()}>
          {format(date, "d")}
        </div>
        <div className={visible ? "day__items day__items--visible" : "day__items day__items--invisible"}>
          <button onClick={() => this.changeVisibility()} className="day__items--toggler">
            ^
          </button>Total: {titleLabel}$ {children}
        </div>
      </span>
    )
  }
}

export default Day
