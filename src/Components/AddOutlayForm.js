import React from "react"
import { DateTime } from "luxon"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import "../css/custom-styles.css"


/*
  TODO
  outlay = {
    date: type Date,
    value: type Int,
    description: type String
  }
*/

class AddOutlayForm extends React.Component {
  state = {
    date: "",
    cost: 0,
    title: ""
  }

  handleDateChange = e => {
    if (DateTime.fromSQL(e.target.value) > DateTime.utc()) {
      alert("The given date cannot be in the future.")
      this.setState({ date: "" })
    } else {
      this.setState({ date: e.target.value })
    }
  }

  handleCostChange = ({ target: { value } }) => {
    if (value < 0) alert("The given cost amount cannot be of negative value.")
    this.setState({ cost: value < 0 ? 0 : value })
  }

  handlePurposeChange = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    const { date, title, cost } = this.state
    const { addCosts } = this.props

    return (
      <form
        className="d-inline py-3 px-3"
        onSubmit={ev => {
          ev.preventDefault()

          if (date && cost) {
            addCosts({
              title: title,
              cost: cost,
              date: date,
              id: DateTime.local().toString() //TODO: fix it
            })
          }
        }}
      >
        <InputGroup bsClass="custom-input-group" className="d-inline">
          <FormControl type="number" min="0" placeholder="$$" onChange={this.handleCostChange} value={cost} required />
          <FormControl
            className="col-md-3"
            type="text"
            placeholder="Purpose"
            onChange={this.handlePurposeChange}
            value={title}
          />
          <FormControl
            max={DateTime.utc().toFormat("yyyy-MM-dd")}
            type="date"
            placeholder="dd/mm/yyyy"
            onChange={this.handleDateChange}
            value={date}
            required
          />

          <Button type="submit">+</Button>
        </InputGroup>
      </form>
    )
  }
}

export default AddOutlayForm
