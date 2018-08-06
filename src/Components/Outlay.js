import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import trash_bin from "../images/trash_bin.svg"

import "../css/outlay.css"

const Outlay = ({ amount, title, id, dispatch, onOutlayClick }) => (
  <div className="outlay-details">
    {amount}
    $&nbsp;{title}
    <button className="outlay-details__delete-button" onClick={onOutlayClick}>
      <img src={trash_bin} className="outlay-details__delete-image" alt="Delete" />
    </button>
  </div>
)

Outlay.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Outlay)
