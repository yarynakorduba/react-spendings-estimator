import React, {Component} from 'react';
let cost, title, date, id=0;

const CostForm = ({addCosts}) => {
    id++;
    return <div>
        <input type="number"
            //  onChange={this.handleCostInputChange}
               placeholder="$$"
               ref={node => {
                   cost = node;
               }}/>
        <input type="text"
            // onChange={this.handleTitleInputChange}
               placeholder="Purpose"
               ref={node => {
                   title = node;
               }}/>
        <input placeholder="dd/mm/yyyy" ref={node => {
            date = node;
        }}/>
        <button
            onClick=
                {() => addCosts({title: title.value, cost: cost.value, date: date.value, id: id})}
        >+
        </button>
    </div>;
};


export default CostForm;