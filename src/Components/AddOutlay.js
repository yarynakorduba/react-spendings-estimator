import React from "react"
import {format} from "date-fns"

export const AddOutlay = ({onAddClick}) => {
    let title, amount, date;
    return (
        <form onSubmit={ev => {
            ev.preventDefault();
            onAddClick(title.value, amount.value, date.value);

        }}
        ><input
            className="container__input"
            type="number"
            min="0"
            placeholder="$$"
            ref={node => {
                amount = node;
            }}/>
            <input
                className="container__input"
                ref={node => {
                    title = node;
                }}/>
            <input
                className="container__input"
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