import React, {Component} from 'react';
import { Info, DateTime, } from 'luxon';
import ReactDOM from 'react-dom';

//representational component for cost list;
const CostList = ({cost_list, deleteCosts, total_costs}) => {
    console.log("received cost list", cost_list);
    return (
        <div id="containerDiv">
            <h3 id="h31">Total costs spent: {total_costs}</h3>
            <h3 id="h32">This is your cost list</h3>

           {(Object.keys(cost_list)).map((item) => {
                return <div key={item}>{Object.keys(cost_list[item]).map((i) => {
                    return <div key={i}>{Object.keys(cost_list[item][i]).map((el) => {
                        return <div key={el}>{(cost_list[item][i][el]).map((ell) => {
                             console.log("id", ell);
                            return <div key={ell.id}><div key={ell.cost*2000}>{ell.cost}</div>
                            <div key={ell.cost*100}>{DateTime.fromObject(ell.date).toFormat('yyyy LLL dd')}</div></div>
                        })}</div>
                    })}</div>
                })}</div>

            })}

        </div>
    );

};

export default CostList;