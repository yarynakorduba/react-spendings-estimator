import React from 'react';
import { DateTime } from 'luxon';
import {Button, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import '../css/custom-styles.css';
// import { Info, DateTime } from 'luxon';

let cost, title, date;


const CostForm = ({addCosts}) => {
    var invalid = ((cost && cost.value <= 0) || (!date));
    console.log("c,jfvk,fvdfkvj ", DateTime.utc().toFormat('yyyy-MM-dd'));
    return <FormGroup className="d-inline py-3 px-3"
                      onSubmit={(event) => event.preventDefault({event})}>
        <InputGroup bsClass="custom-input-group" className="d-inline">
        <FormControl type="number" min="0"
               placeholder="$$"
               inputRef={node => {
                   cost = node;
               }} required/>
        <FormControl className="col-md-3" type="text"
               placeholder="Purpose"
               inputRef={node => {
                   title = node;
               }}/>
       <FormControl type="date" placeholder="dd/mm/yyyy" max={DateTime.utc().toFormat('yyyy-MM-dd')}
               inputRef={node => {
                   date = node;
               }} required/>


        <Button type="submit" disabled={invalid}
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