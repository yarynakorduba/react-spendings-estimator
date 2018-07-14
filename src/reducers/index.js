import React from "react"
import parse from 'date-fns/parse'
import { combineReducers} from 'redux';
import {base} from "../firebase"

import {filter} from 'ramda';

const iterateBy = (groupingFn, iteratorFn) =>
    compose(
        //prettier-ignore
        reverse,
        values,
        mapObjIndexed(iteratorFn),
        groupBy(({ date }) => groupingFn(date))
    );

export const byId = (state={}, action) => {
    switch (action.type) {
        case 'RECEIVE_OUTLAYS':
            const nextState = {...state};

            action.response.forEach(outlay => {
                nextState[outlay.id] = outlay;
            });
            return nextState;
        default:
            return state;
    }
};

const allIds = (state=[], action) => {
  switch(action.type) {
      case 'RECEIVE_OUTLAYS':
          console.log(allIds);
          return action.response.map(outlay => outlay.id);
      // case 'ADD_OUTLAY':
      //     console.log("here");
      //     var data = {action};
      //     base.ref(`outlays`).set(
      //         data
      //     );
      //     return [...state, action.id];
      case 'DELETE_OUTLAY':
          return filter(item => item != action.id, state );
      default:
          return state;
  }
};


export const date = (state=[],action) => {
    switch (action.type) {
        case 'SHOW_YEAR':
        case 'SHOW_MONTH':
        case 'SHOW_DATE':
        default:
                return state;
    }
};


export const costApp = combineReducers({
    allIds,
    byId
});


export const addToFirebase = (item) => {
    console.log(item);
    base.ref(`outlays/${item.id}`).set(
         item
    );
};

export const removeFromFirebase = (id) => {
    base.ref(`/${id}`).remove()
};


export const getOutlays = (state) => {
  const ids = state.allIds;
  console.log("=====> ", ids);
  return ids.map(id => state.byId[id])
};
