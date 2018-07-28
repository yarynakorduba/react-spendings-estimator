import React from "react"

const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_OUTLAYS_SUCCESS":
      const nextState = { ...state }
      if (action.response != null) {
        action.response.forEach(outlay => {
          outlay.date = new Date(outlay.date)
          nextState[outlay.id] = outlay
        })
      }
      return nextState
    case "ADD_OUTLAY_SUCCESS":
      return {
        ...state,
        [action.response.id]: action.response
      }

    default:
      return state
  }
}

export default byId

export const getOutlay = (state, id) => state[id]
