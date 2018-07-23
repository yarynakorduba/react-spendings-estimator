import {applyMiddleware, createStore} from "redux";
import outlays from './reducers';
import { createLogger } from "redux-logger";


const thunk = (store) => (next) => (action) =>
    typeof action === 'function' ? (console.log("!", store.getState()) ||
        action(store.dispatch, store.getState)) :
        next(action);

const configureStore = () => {
    const middlewares = [thunk];
    middlewares.push(createLogger());

    return createStore(
        outlays,
        applyMiddleware(...middlewares)
    );

};


export default configureStore;