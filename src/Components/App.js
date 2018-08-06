import React from "react"
import AddOutlay from "./AddOutlay"
import Layout from "./Layout"
import PropTypes from "prop-types"

import "../css/estimator.css"

const App = () => (
  <div className="estimator">
    <h1 className="estimator__heading">Outlays Estimator</h1>
    <AddOutlay />
    <Layout />
  </div>
)

App.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.string
  })
}

export default App
