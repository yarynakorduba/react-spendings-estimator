import React from "react"
import { combineReducers } from "redux"
import byId, * as fromById from "./byId"
import allIds, * as fromList from "./allIds"

const outlays = combineReducers({
  byId,
  allIds: allIds()
})

export default outlays

export const getOutlays = state => {
  const ids = fromList.getIds(state.allIds)
  return ids.map(id => fromById.getOutlay(state.byId, id))
}

export const getIsFetching = state => fromList.getIsFetching(state.allIds)
