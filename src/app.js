import React from "react"
import ReactDOM from "react-dom"
import Layout from "./Components/Layout"
import "./css/custom-styles.css"

const App = () => (
  <div className="container">
    <h1>My Cost App</h1>
    <Layout />
  </div>
)

ReactDOM.render(<App />, document.getElementById("app"))

module.hot.accept()
