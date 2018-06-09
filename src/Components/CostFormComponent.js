import React from 'react';
import { DateTime } from 'luxon';
import {Button, FormControl, FormGroup, Grid,Row, InputGroup} from 'react-bootstrap';
import '../css/custom-styles.css';

let cost, title, date;


const CostForm = ({addCosts}) => {

    return <FormGroup className="d-inline py-3 px-3"
                      onSubmit={(event) => event.preventDefault({event})}>
        <InputGroup bsClass="custom-input-group" className="d-inline">
        <FormControl type="number"
               placeholder="$$"
               inputRef={node => {
                   cost = node;
               }} required/>
        <FormControl className="col-md-3" type="text"
               placeholder="Purpose"
               inputRef={node => {
                   title = node;
               }}/>
       <FormControl type="date" placeholder="dd/mm/yyyy"
               inputRef={node => {
                   date = node;
               }} required/>


        <Button type="submit"
                onClick=
                    {() => {
                        (event) => event.preventDefault({event});
                        if (date.value && cost.value)
                            addCosts({title: title.value, cost: cost.value, date: date.value, id: DateTime.local().toString()})}}
        >+
        </Button>

        </InputGroup>
    </FormGroup>;
};


export default CostForm;