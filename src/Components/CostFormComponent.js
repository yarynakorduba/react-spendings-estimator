import React from 'react';
import { DateTime, Interval } from 'luxon';
import {Button, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import '../css/custom-styles.css';


class CostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            cost: 0,
            title: ''
        }
    }

    handleDateChange = (e) => {
        if (DateTime.fromSQL(e.target.value) > DateTime.utc()) {
            alert("The given date cannot be in the future.");
            this.setState({date: ""});
        }else{
            this.setState({date: e.target.value});
        }
    };

    handleCostChange = (e) => {
        if (e.target.value < 0) {
            alert("The given cost amount cannot be of negative value.");
            this.setState({cost: 0});
        }else{
            this.setState({cost: e.target.value});
        }
    };
    handlePurposeChange = (e) => {
        this.setState({title: e.target.value});
    };

    render() {
        const {date, title, cost} = this.state;
        return <FormGroup className="d-inline py-3 px-3"
                          onSubmit={(event) => event.preventDefault({event})}>
            <InputGroup bsClass="custom-input-group" className="d-inline">
                <FormControl type="number" min="0"
                             placeholder="$$"
                             onChange={this.handleCostChange}
                             value={cost} required/>
                <FormControl className="col-md-3" type="text"
                             placeholder="Purpose"
                             onChange={this.handlePurposeChange}
                             value={title}
                />
                <FormControl
                            max={DateTime.utc().toFormat('yyyy-MM-dd')}
                             type="date" placeholder="dd/mm/yyyy"
                             onChange={this.handleDateChange}
                             value={date}
                             required/>


                <Button type="submit"
                        onClick=
                            {() => {
                                console.log(title, cost, date);
                                (event) => event.preventDefault({event});
                                if (date && cost)
                                    this.props.addCosts({
                                        title: title,
                                        cost: cost,
                                        date: date,
                                        id: DateTime.local().toString()
                                    })
                            }}
                >+
                </Button>

            </InputGroup>
        </FormGroup>;
    }
};


export default CostForm;