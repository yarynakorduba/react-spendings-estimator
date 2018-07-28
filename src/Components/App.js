import React from "react"
import AddOutlay from "./AddOutlay"
import Layout from "./Layout"
import PropTypes from "prop-types"

const App = () => (
  <div className="outlay--list">
    <h1 className="heading--large">My Cost App</h1>
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
