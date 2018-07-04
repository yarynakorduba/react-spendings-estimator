import {applyMiddleware, createStore} from "redux";
import {costApp} from './reducers';
import logger from "redux-logger";

export const store = createStore(
    costApp,
    applyMiddleware(logger));
