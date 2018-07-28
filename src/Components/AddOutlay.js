import React from "react"
import {format} from "date-fns"
import {addOutlay} from "../actions";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export const AddOutlay = ({dispatch}) => {
    let title, amount, date;
    return (
        <form onSubmit={ev => {
            ev.preventDefault();
            dispatch(addOutlay(title.value, amount.value, date.value));
        }}
        ><input
            className="add-outlay__input"
            type="number"
            min="0"
            placeholder="$$"
            ref={node => {
                amount = node;
            }}/>
            <input
                className="add-outlay__input"
                ref={node => {
                    title = node;
                }}/>
            <input
                className="add-outlay__input"
                max={format(new Date(), "YYYY-MM-DD")}
                ref={node => {
                    date = node;
                }}
                type="date"
                placeholder="dd/mm/yyyy"
                required
            />
            <button type="submit">
                +
            </button>
        </form>
    );
};

AddOutlay.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(AddOutlay);