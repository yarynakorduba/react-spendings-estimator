import React, {Fragment} from "react"
import { DateTime } from "luxon"
import { parse, getYear, getMonth, getDate, isFuture, format } from 'date-fns'
import "../css/custom-styles.css"


/*
  TODO
  outlay = {
    date: type Date,
    value: type Int,
    description: type String
  }
*/
var date_invalid, cost_invalid;




class AddOutlayForm extends React.Component {
  state = {
    date: "",
    cost: 0,
    title: "",
  };

  handleDateChange = ({ target: { value } }) => {
      date_invalid = isFuture(parse(value));
      this.setState({ date: date_invalid ? '' : format(parse(value), "YYYY-MM-DD")})
  };

  handleCostChange = ({ target: { value } }) => {
    cost_invalid = (value < 0);
    this.setState({ cost: value < 0 ? 0 : value })
  };

  handlePurposeChange = ({ target: { value } }) => {
    this.setState({ title: e.target.value })
  };

  render() {
    const { date, title, cost } = this.state;
    const { addCosts } = this.props;

    return (
        <Fragment>
      <form
        className="container__form"
        onSubmit={ev => {
          ev.preventDefault();

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
          <input type="number"
                 className="container__input"
                 min="0" placeholder="$$"
                 onChange={this.handleCostChange} value={cost} required />
          <input
            className="container__input"
            type="text"
            placeholder="Purpose"
            onChange={this.handlePurposeChange}
            value={title}
          />
          <input className="container__input"
            max={format(new Date(),"YYYY-MM-DD")}
            type="date"
            placeholder="dd/mm/yyyy"
            onChange={this.handleDateChange}
            value={date}
            required
          />

          <button type="submit" className="container__input">+</button>
      </form>
            <div className="error-msg" style={date_invalid ? {opacity: 1 }: {opacity: 0}}>Date should be in the past</div>
            <div className="error-msg" style={cost_invalid ? {opacity: 1 }: {opacity: 0}}>Costs should be greater than 0</div>

          </Fragment>
    )
  }
}

export default AddOutlayForm
