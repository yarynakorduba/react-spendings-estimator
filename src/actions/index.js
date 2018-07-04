import {store} from "../configureStore";
import {v4} from "react-native-uuid";


export const addOutlay = (title, amount, date) =>
    store.dispatch({
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

