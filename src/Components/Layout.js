import React, { Fragment } from "react"
import YearOutlaysList from "./YearOutlaysList"

import { deleteOutlay, addOutlay } from "../actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { isSameYear } from "date-fns"
import { groupWith, compose, sort, map, head } from "ramda"

import { getAmountByYear, getTotalAmount } from "./GetAmountOfMoney"
import { withProps, branch, renderComponent } from "recompose"
import { withOutlays } from "./HOC"
import Loading from "./Loading"

const Layout = ({ deleteOutlay, outlays, addOutlay, years }) => (
  <Fragment>
    <h2 className="estimator__money-amount">Total amount: {getTotalAmount(outlays)}$</h2>

    {years.map(year => (
      <Fragment key={year}>
        <h2>
          {year} <span className="year__money-amount">{getAmountByYear(new Date(year, 1, 1))(outlays)}$</span>
        </h2>

        <YearOutlaysList year={year} />
      </Fragment>
    ))}
  </Fragment>
)

Layout.propTypes = {
  outlays: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  deleteOutlay: PropTypes.func.isRequired,
  addOutlay: PropTypes.func.isRequired
}

const enhance = compose(
  withOutlays,

  connect(null, { deleteOutlay, addOutlay }),

  branch(({ isFetching, outlays }) => isFetching && outlays.length === 0, renderComponent(Loading)),

  withProps(({ outlays }) => ({
    years: compose(
      map(groupByYear => head(groupByYear).date.getFullYear()),
      groupWith((a, b) => isSameYear(a.date, b.date)),
      sort((a, b) => a.date < b.date)
    )(outlays)
  }))
)

export default enhance(Layout)
