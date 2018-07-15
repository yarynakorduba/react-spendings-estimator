import React from "react"
import parse from 'date-fns/parse'
import { combineReducers} from 'redux';
import {base} from "../firebase"
import {filter} from 'ramda';
import byId, * as fromById from './byId';
import allIds, * as fromList from './allIds';


const outlays = combineReducers({
    byId,
    allIds: allIds(),
});

export default outlays;

export const getOutlays = (state) => {
  const ids = fromList.getIds(state.allIds);
    console.log("=====> ", state.allIds);

    return ids.map(id => console.log(id) || fromById.getOutlay(state.byId, id))
};

export const getIsFetching = (state) =>
    fromList.getIsFetching(state.allIds);
