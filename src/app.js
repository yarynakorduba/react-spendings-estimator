import React from "react"
import { render } from "react-dom"
import configureStore from "./configureStore"

import "./css/estimator.css"
import Root from "./Components/Root"

const store = configureStore()
render(<Root store={store} />, document.getElementById("app"))
module.hot.accept()
