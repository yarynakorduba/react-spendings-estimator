import React from 'react';
import { DateTime } from 'luxon';
import {Button, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import '../css/custom-styles.css';
// import { Info, DateTime } from 'luxon';

let cost, title, date, validDate;


const CostForm = ({addCosts}) => {
    function handleDateChange({target}) {
        console.log(DateTime.utc(), "in date ", date.value);
        if (DateTime.fromSQL(target.value) > DateTime.utc()) {
            validDate = false;
            console.log("invalid");
        }else{validDate=true;}
    }
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
       <FormControl bsStyle={validDate ? "danger" : "none"}
           type="date" placeholder="dd/mm/yyyy" max={DateTime.utc().toFormat('yyyy-MM-dd')}
                    onChange={handleDateChange}
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