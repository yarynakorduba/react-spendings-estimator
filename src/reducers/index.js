import React from "react"
import parse from 'date-fns/parse'
import { combineReducers} from 'redux';
import {base} from "../firebase"
import {filter} from 'ramda';
import byId, * as fromById from './byId';
import allIds, * as fromList from './allIds';

const iterateBy = (groupingFn, iteratorFn) =>
    compose(
        //prettier-ignore
        reverse,
        values,
        mapObjIndexed(iteratorFn),
        groupBy(({ date }) => groupingFn(date))
    );


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
  const ids = fromList.getIds(state.allIds);
  console.log("=====> ", ids);
  return ids.map(id => fromById.getOutlay(state.byId, id))
};
