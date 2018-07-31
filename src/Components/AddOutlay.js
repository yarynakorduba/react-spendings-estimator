import React, { Fragment } from "react"
import { format } from "date-fns"
import { addOutlay } from "../actions"
import PropTypes from "prop-types"
import { connect } from "react-redux"

export const AddOutlay = ({ dispatch }) => {
  let title, amount, date
  return (
    <Fragment>
      <form
        onSubmit={ev => {
          ev.preventDefault()
          dispatch(addOutlay(title.value, amount.value, date.value))
        }}
      >
        <input
          className="add-outlay__input"
          type="number"
          min="0"
          placeholder="$$"
          ref={node => {
            amount = node
          }}
        />
        <input
          className="add-outlay__input"
          ref={node => {
            title = node
          }}
        />
        <input
          className="add-outlay__input"
          max={format(new Date(), "YYYY-MM-dd")}
          ref={node => {
            date = node
          }}
          type="date"
          required
        />
        <button className="add-outlay__button" type="submit">
          +
        </button>
      </form>
    </Fragment>
  )
}

AddOutlay.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AddOutlay)
