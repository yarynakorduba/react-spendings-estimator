import React from "react"
import ReactDOM from "react-dom"
import Layout from "./Components/Layout"

const App = () => (
  <div className="container text-center">
    <h1>My Cost App</h1>
    <Layout />
  </div>
)

ReactDOM.render(<App />, document.getElementById("app"))

module.hot.accept()
