import {applyMiddleware, createStore} from "redux";
import {costApp} from './reducers';
import { createLogger } from "redux-logger";
import promise from 'redux-promise';


const configureStore = () => {
    const middlewares = [promise];
    middlewares.push(createLogger());

    return createStore(
        costApp,
        applyMiddleware(...middlewares)
    );

};


export default configureStore;