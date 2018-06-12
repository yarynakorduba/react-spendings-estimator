import React, {Component} from 'react';
import { DateTime } from 'luxon';
import {Panel, Button} from 'react-bootstrap';
import '../css/custom-styles.css';


//representational component for cost list;
const CostList = ({cost_list, deleteCosts, total_costs}) => {
    if (cost_list !== {} && cost_list !== 'Null') {
        return (
            <div id="containerDiv">
                <h3>Total costs spent: {total_costs || "..."}</h3>
                {(Object.keys(cost_list)).map((item) => {
                    return <Panel bsStyle="info" className="h-100" key={item}>
                        <Panel.Heading>
                            <Panel.Title componentClass="h2">Year {item}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{Object.keys(cost_list[item]).map((i) => {
                            return <MonthList key={i} cost_list={cost_list} item={item} i={i} deleteCosts={deleteCosts}/>;
                    })}</Panel.Body></Panel>
                })}
            </div>
        );
    }else{return(<div>No item yet</div>);}
};

const MonthList = ({cost_list, item, i, deleteCosts}) => {
    return <Panel className="col-md-3 px-2 cards" key={i}>
        <h4>Month {i}</h4>
        {Object.keys(cost_list[item][i]).map((el) => {
            if (el) {
                return <DayList key={el} cost_list={cost_list} item={item}
                                i={i} el={el} deleteCosts={deleteCosts}/>
            }
        })}</Panel>;
};

const DayList = ({cost_list, item, i, el, deleteCosts}) => {
    return (<Panel key={el}>
        <Panel.Heading><Panel.Title componentClass="h5">Day {el}</Panel.Title></Panel.Heading>
        {(cost_list[item][i][el]).map((ell) => {
            if (ell && ell.title) {
                return <div key={ell.id}>
                    {ell.cost}$ (Purpose: {ell.title})
                    <Button bsStyle="link" bsSize="xs" onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>x</Button>
                </div>
            } else if (ell) {
                return (
                    <div key={ell.id} className="py-2">
                        {ell.cost}$ <Button bsStyle="link" bsSize="xs" onClick={() => deleteCosts(item, i, el, ell.id, ell.cost)}>x</Button>
                    </div>)
            }
        })}
        Total: {
        Object.keys(cost_list[item][i][el]).total = Object.keys(cost_list[item][i][el]).reduce(function (sum, elem) {
        return sum + eval(cost_list[item][i][el][elem].cost);
        }, 0)
        }$
    </Panel>);
};


export default CostList;