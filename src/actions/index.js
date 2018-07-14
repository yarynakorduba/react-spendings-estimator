import {store} from "../configureStore";
import {v4} from "react-native-uuid";
import * as api from '../api';

export const addOutlay = (title, amount, date) =>
    ({
        type: 'ADD_OUTLAY',
        id: v4(),
        title,
        amount: Number(amount),
        date
    });


export const deleteOutlay = (id) => store.dispatch({
    type: 'DELETE_OUTLAY',
    id
    });

const receiveOutlays = (response) => ({
    type: 'RECEIVE_OUTLAYS',
    response
});

export const fetchOutlays = () =>
    api.fetchOutlays().then(response => receiveOutlays(response));

