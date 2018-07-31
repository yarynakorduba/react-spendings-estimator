import React, { Fragment } from "react"
import Calendar from "./Calendar"
import * as actions from "../actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getOutlays, getIsFetching } from "../reducers"
import { isSameYear } from "date-fns"
import { groupWith, compose, sort, map, head, sum } from "ramda"
import {Day} from "./Day"
import {getAmountByYear, getTotalAmount} from "./GetAmountOfMoney";

import "../css/outlay.css"


class Layout extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { fetchOutlays } = this.props
    fetchOutlays()
  }

  render() {
    const { deleteOutlay, outlays, isFetching, addOutlay } = this.props
    if (isFetching && !outlays.length) {
      return <p>Loading...</p>
    }

    const years = compose(
      map(groupByYear => head(groupByYear).date.getFullYear()),
      groupWith((a, b) => isSameYear(a.date, b.date)),
      sort((a, b) => a.date < b.date)
    )(outlays)

    return <Fragment><br/><div>Total amount: {getTotalAmount(outlays)}$</div>

      {years.map(year => (
      <Fragment>
        <h2>{year} {getAmountByYear(new Date(year, 1, 1))(outlays)}$</h2>
        <Calendar year={year} outlays={outlays} onOutlayClick={deleteOutlay} onAdd={addOutlay}>
          {day => <Day day={day} outlays={outlays} />}
        </Calendar>
      </Fragment>
    ))}</Fragment>
  }
}

Layout.propTypes = {
  outlays: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchOutlays: PropTypes.func.isRequired,
  deleteOutlay: PropTypes.func.isRequired,
  addOutlay: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  outlays: getOutlays(state),
  isFetching: getIsFetching(state)
})

Layout = connect(mapStateToProps, actions)(Layout)
export default Layout
