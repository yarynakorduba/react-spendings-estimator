import React from "react"
import parse from 'date-fns/parse'
import { combineReducers} from 'redux';
import { base } from "../firebase"

import {filter} from 'ramda';

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
                id: action.id,
                title: action.title,
                amount: Number(action.amount),
                date: parse(action.date, "yyyy-MM-dd", new Date())
            };

        default:
            return state;
    }
};
export const byId = (state={}, action) => {
    switch (action.type) {
        case 'ADD_OUTLAY':
            console.log(state, "||||", action.id);
            return {
                ...state,
                [action.id]: outlay(state[action.id], action)
            };

        default:
            return state;
    }
};

const allIds = (state=[], action) => {
  switch(action.type) {
      case 'ADD_OUTLAY':
          console.log("here");
          base.ref(`outlays/${action.id}`).set(
              action
          );
          return [...state, action.id];
      case 'DELETE_OUTLAY':
          console.log(state, "fjfdjl", action.id);
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
    // base.ref(`outlays/${item.id}`).set(
    // //     item
    // );
};

export const removeFromFirebase = (id) => {
    base.ref(`/${id}`).remove()
};

export const fetchOutlays = () => {
    return base.ref("outlays").on("value", function(snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // return base.child("outlays").val();
    // return base.ref().once("value").then(
    //     function(snapshot) {return snapshot.child("outlays").val()});
};