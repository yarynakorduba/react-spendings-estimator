import React from "react"
import v4 from 'react-native-uuid';
import parse from 'date-fns/parse'
import { combineReducers,
    createStore,
    applyMiddleware } from 'redux';
import {filter} from 'ramda';
import logger from 'redux-logger';

const iterateBy = (groupingFn, iteratorFn) =>
    compose(
        //prettier-ignore
        reverse,
        values,
        mapObjIndexed(iteratorFn),
        groupBy(({ date }) => groupingFn(date))
    );

export const outlay = (state, action) => {
    switch (action.type) {
        case 'ADD_OUTLAY':
            return {
                id: v4(),
                title: action.title,
                amount: Number(action.amount),
                date: parse(action.date, "yyyy-MM-dd", new Date())
            };

        default:
            return state;
    }
};
export const outlays = (state=[], action) => {
    switch (action.type) {
        case 'ADD_OUTLAY':
            return [
                ...state,
                outlay(undefined, action)
            ];
        case 'DELETE_OUTLAY':
            console.log("kdf,nmn,mgn,mn,m,n,n "+ action.id);
            return filter(item =>
                item.id !== action.id, state );
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
    outlays,
});


