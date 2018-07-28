import React from "react"
import { Provider } from "react-redux"
import App from "./App"
import { hot } from "react-hot-loader"

import PropTypes from "prop-types"

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default hot(module)(Root)
