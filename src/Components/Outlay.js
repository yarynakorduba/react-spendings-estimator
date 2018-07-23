import React from "react"

export const Outlay = ({ amount, title, id, onDeleteOutlay }) => (

    <div className="container__spending">
        {amount}
        $&nbsp;{title}
        <button className="item__button" onClick={onDeleteOutlay}>
            x
        </button>
    </div>
);