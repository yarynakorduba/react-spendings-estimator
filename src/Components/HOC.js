import { compose } from "ramda"
import { connect } from "react-redux"
import {withProps} from "recompose"
import { getIsFetching, getOutlays } from "../reducers"
import { fetchOutlays } from "../actions"

export const withOutlays = compose(
  connect(
    state => ({
      outlays: getOutlays(state),
      isFetching: getIsFetching(state)
    }),
    { fetchOutlays }
  ),

  withProps(({ outlays, isFetching, fetchOutlays }) => {
    if (outlays.length === 0 && !isFetching) fetchOutlays()
  })
)
