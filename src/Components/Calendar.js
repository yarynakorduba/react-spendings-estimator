import React from "react"
import {Year} from './Year'
import {Month} from './Month'
import {Day} from './Day'
import {Outlay} from './Outlay'
import PropTypes from 'prop-types'
import {compose, map, reverse, prop, sum, filter, groupBy, mapObjIndexed, values} from 'ramda'
import {
    isWithinInterval,
    startOfDay,
    startOfMonth,
    startOfYear,
    endOfDay,
    endOfMonth,
    endOfYear,
    getYear,
    getMonth,
    getDate
} from "date-fns"
import {deleteOutlay} from "../actions";

const iterateBy = (groupingFn, iteratorFn) =>
    compose(
        //prettier-ignore
        reverse,
        values,
        mapObjIndexed(iteratorFn),
        groupBy(({ date }) => groupingFn(date))
    );
const getAmountByInterval = interval =>  compose(
    sum,
    map(prop("amount")),
    filter(({ date }) => console.log("@@@@!", date, interval) || isWithinInterval(date, interval))
);
const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() });
const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
const getAmountByDay = date => getAmountByInterval({ start: startOfDay(date), end: endOfDay(date) })

const getAllOutlays = (state) => {
    return state.allIds.map(id => state.byId[id]);
};

const Calendar = ({outlays, deleteOutlay}) => (

    !outlays ? (<div>No items yet{console.log("|||| ", outlays)}</div>) : (
            <div className="container">
                {console.log("|||| ", outlays)}
                <h3>Total amount spent: { "..."}$</h3>
                {iterateBy(getYear, items => (
                    <Year key={items[0].date} date={items[0].date} titleLabel={getAmountByYear(items[0].date)(items)}>
                        {iterateBy(getMonth, items => (
                            <Month key={items[0].date} date={items[0].date}
                                   titleLabel={getAmountByMonth(items[0].date)(items)}>
                                {iterateBy(getDate, items => (
                                    <Day key={items[0].date} date={items[0].date}
                                         titleLabel={getAmountByDay(items[0].date)(items)}>
                                        {map(
                                            ({amount, id, title}) => (
                                                <Outlay key={id} amount={amount} id={id} title={title}

                                                        onDeleteOutlay={deleteOutlay}/>
                                            ),
                                            items
                                        )}
                                    </Day>
                                ))(items)}
                            </Month>
                        ))(items)}
                    </Year>
                ))(outlays)}
            </div>)
);

Calendar.contextTypes = {
    store: PropTypes.object,
    outlays: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired,
    date: PropTypes.any.isRequired}))
};

export default Calendar;