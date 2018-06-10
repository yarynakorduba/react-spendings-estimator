import React, {Component} from 'react';
import { DateTime } from 'luxon';
import {Panel} from 'react-bootstrap';
import '../css/custom-styles.css';


//representational component for cost list;
const CostList = ({cost_list, deleteCosts, total_costs}) => {
    if (total_costs !== 0 && cost_list !== {} && cost_list !== 'Null' && cost_list.length !== 0) {
        console.log("here", cost_list);

        return (
            <div id="containerDiv">
                <h3>Total costs spent: {total_costs || "..."}</h3>

                {(Object.keys(cost_list)).map((item) => {
                    return <Panel className="container col-md-12 h-100" key={item}>
                        <h2>Year {item}</h2>
                        {Object.keys(cost_list[item]).map((i) => {
                        return <Panel className="col-md-3 px-2 cards" key={i}>
                            <h3>Month {i}</h3>
                            {Object.keys(cost_list[item][i]).map((el) => {
                            if (el) {
                                return <Panel key={el}><h4>Day {el}</h4>
                                    {(cost_list[item][i][el]).map((ell) => {
                                    if (ell && ell.title) {

                                        return <div key={ell.id}
                                                    onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>
                                            Amount: {ell.cost}$, {DateTime.local(ell.date.c.year, ell.date.c.month, ell.date.c.day) .toFormat('yyyy LLL dd')} (Purpose: {ell.title})</div>
                                    } else if (ell) {
                                        return (

                                            <div key={ell.id}
                                                    onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>
                                            Amount: {ell.cost}$, {DateTime.local(ell.date.c.year, ell.date.c.month, ell.date.c.day).toFormat('yyyy LLL dd')}</div>)
                                    } else {
                                        return <div></div>
                                    }
                                })}</Panel>

                            }
                        })}</Panel>
                    })}</Panel>
                })}
            </div>
        );
    }else{return(<div>No item yet</div>);}

};

export default CostList;