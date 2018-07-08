import {applyMiddleware, createStore} from "redux";
import {costApp} from './reducers';
import logger from "redux-logger";



export const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    }
};

export const store = createStore(
    costApp,
    applyMiddleware(logger));