import {store} from "../configureStore";
import {v4} from "react-native-uuid";
import * as api from '../api';
import {getIsFetching} from "../reducers";

export const addOutlay = (title, amount, date) =>
    ({
        type: 'ADD_OUTLAY',
        id: v4(),
        title,
        amount: Number(amount),
        date
    });


export const deleteOutlay = (id) => ({
    type: 'DELETE_OUTLAY',
    id
    });

const receiveOutlays = (response) => ({

    type: 'RECEIVE_OUTLAYS',
    response
});

const requestOutlays = () => {
    console.log("in request");
    return {
        type: 'REQUEST_OUTLAYS'
    }
};

export const fetchOutlays = () => (dispatch) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    };
    dispatch(requestOutlays());
    return api.fetchOutlays().then(response => dispatch(receiveOutlays(response)));
};



