import React from "react"
import ReactDOM from "react-dom"
import {store} from './configureStore'
import "./css/custom_styles.css"
import Root from './Components/Root'

const render = () => {
    ReactDOM.render(
        <Root store={store} />,
        document.getElementById("app"))
};
render();

module.hot.accept();
