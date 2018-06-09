import React, {Component} from 'react';
import { DateTime } from 'luxon';


//representational component for cost list;
const CostList = ({cost_list, deleteCosts, total_costs}) => {
    if (total_costs !== 0 && cost_list !== {} && cost_list !== 'Null' && cost_list.length !== 0) {
        console.log("here", cost_list);
        return (

            <div id="containerDiv">
                <h3>Total costs spent: {total_costs || "..."}</h3>
                <h3>This is your cost list</h3>

                {(Object.keys(cost_list)).map((item) => {
                    return <div key={item}>{Object.keys(cost_list[item]).map((i) => {
                        return <div key={i}>{Object.keys(cost_list[item][i]).map((el) => {
                            if (el) {
                                console.log("el ", cost_list[item]);
                                return <div key={el}>{(cost_list[item][i][el]).map((ell) => {
                                    if (ell && ell.title) {
                                        console.log("ell.date", ell.date);
                                        return <div key={ell.id}
                                                    onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>
                                            Amount: {ell.cost}$, {DateTime.local(ell.date.c.year, ell.date.c.month, ell.date.c.day) .toFormat('yyyy LLL dd')} (Purpose: {ell.title})</div>
                                    } else if (ell) {
                                        console.log("ell.date", ell.date);
                                        return <div key={ell.id}
                                                    onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>
                                            Amount: {ell.cost}$, {DateTime.local(ell.date.c.year, ell.date.c.month, ell.date.c.day).toFormat('yyyy LLL dd')}</div>
                                    } else {
                                        return <div>.</div>
                                    }
                                })}</div>

                            }
                        })}</div>
                    })}</div>
                })}
            </div>
        );
    }else{return(<div>No item yet</div>);}

};

export default CostList;