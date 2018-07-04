import React, {Fragment} from "react"
import {v4} from "react-native-uuid";
import {store} from '../configureStore';
import {AddOutlay} from "./AddOutlay";
import {addOutlay} from '../actions';
import { compose, map, reverse, prop, sum, filter, groupBy, mapObjIndexed, values } from "ramda"
import {
    format,
    isWithinInterval,
    startOfDay,
    startOfMonth,
    startOfYear,
    endOfDay,
    endOfMonth,
    endOfYear,
    getYear,
    getMonth,
    getDate } from "date-fns"


class OutlayForm extends React.Component {
    render() {
        return (
            <div>
                Hi!
                <AddOutlay onAddClick={
                    (title, amount, date) =>
                        addOutlay(title, amount, date) }
                />
            </div>);
    }
}

export default OutlayForm;