import {applyMiddleware, createStore} from "redux";
import outlays from './reducers';
import { createLogger } from "redux-logger";
import promise from 'redux-promise';


const configureStore = () => {
    const middlewares = [promise];
    middlewares.push(createLogger());

    return createStore(
        outlays,
        applyMiddleware(...middlewares)
    );

};


export default configureStore;