import {store} from "../configureStore";
import * as api from '../api';
import {getIsFetching} from "../reducers";
import {parse} from "date-fns";

export const deleteOutlay = (id) => (dispatch) => (
    api.deleteOutlay(id).then(response =>
        dispatch({
            type: 'DELETE_OUTLAY_SUCCESS',
            response
        })
    )

    );

export const addOutlay = (title, amount, date) => (dispatch) =>
    api.addOutlay(title,amount, parse(date, "yyyy-MM-dd", new Date())).then(response =>
        dispatch({
            type: 'ADD_OUTLAY_SUCCESS',
            response
        })
    );


export const fetchOutlays = () => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    };
    dispatch({
        type: 'FETCH_OUTLAYS_REQUEST'
    });

    return api.fetchOutlays().then(response => dispatch(
        {
            type: 'FETCH_OUTLAYS_SUCCESS',
            response
        })
    );
};



