import React, {Fragment} from "react"
import { parse, isPast, format} from 'date-fns'
import {v1} from "react-native-uuid";

/*
  TODO
  outlay = {
    date: type Date,
    value: type Int,
    description: type String
  }
*/
var date_invalid, amount_invalid;

class AddOutlayForm extends React.Component {
  state = {
    date: new Date(),
    amount: 0,
    title: "",
  };

  handleDateChange = ({ target: { value } }) => {
      date_invalid = !isPast(parse(value));
      this.setState({ date: date_invalid ? new Date():
              value})
  };

  handleCostChange = ({ target: { value } }) => {
    amount_invalid = (value < 0);
    this.setState({ amount: value < 0 ? 0 : value })
  };

  handlePurposeChange = ({ target: { value } }) => {
    this.setState({ title: value })
  };

  render() {
    const { date, title, amount } = this.state;
    const { addOutlay } = this.props;

    return (
        <Fragment>
      <form
        className="container__form"
        onSubmit={ev => {
          ev.preventDefault();
          if (date && amount) {
            addOutlay({
              title: title,
              amount: amount,
              date: format(date, "YYYY-MM-DD"),
              id: v1()
            })
          }
        }}
      >
          <input type="number"
                 className="container__input"
                 min="0" placeholder="$$"
                 onChange={this.handleCostChange} value={amount} required />
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
            value={format(date, "YYYY-MM-DD")}
            required
          />
          <button type="submit" className="container__input">+</button>
      </form>
            <div className="error-msg" style={date_invalid ? {opacity: 1 }: {opacity: 0}}>Date should be in the past</div>
            <div className="error-msg" style={amount_invalid ? {opacity: 1 }: {opacity: 0}}>Amount should be greater than 0</div>
          </Fragment>
    )
  }
}

export default AddOutlayForm
