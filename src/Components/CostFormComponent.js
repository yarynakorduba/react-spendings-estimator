import React, {Component} from 'react';


let cost, title, date, id=0;

const CostForm = ({addCosts}) => {

    return <form onSubmit={(event) => event.preventDefault({event})}>
        <input type="number"
               placeholder="$$"
               ref={node => {
                   cost = node;
               }} required/>
        <input type="text"
               placeholder="Purpose"
               ref={node => {
                   title = node;
               }}/>
        <input type="date" placeholder="dd/mm/yyyy"
               ref={node => {
            date = node;
        }} required/>



        <button type="submit"
            onClick=
                {() => {id++;
                    (event) => event.preventDefault({event});
                    if (date.value && cost.value)
                    addCosts({title: title.value, cost: cost.value, date: date.value, id: id})}}
        >+
        </button>
    </form>;
};


export default CostForm;