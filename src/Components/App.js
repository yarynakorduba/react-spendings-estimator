import React from "react"
import AddOutlay from "./AddOutlay"
import Layout from "./Layout"
import PropTypes from "prop-types"

import "../css/heading.css"
import "../css/calendar.css"

const App = () => (
  <div className="estimator">
    <h1 className="heading--large">Outlays Estimator</h1>
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
