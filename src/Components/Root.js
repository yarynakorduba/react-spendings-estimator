import React from 'react'
import {Provider} from 'react-redux';
import App from './App';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from "prop-types";


const Root = ({store}) => (
    <Provider store={store}>
        <App />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
