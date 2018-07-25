import React from "react"
import {Year} from './Year'
import {Month} from './Month'
import {Day} from './Day'
import {Outlay} from './Outlay'
import PropTypes from 'prop-types'
import {compose, map, reverse, prop, sum, filter, groupBy, mapObjIndexed, values, tap} from 'ramda'
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

const getAmountByInterval = interval =>  compose(
    sum,
    map(prop("amount")),
    filter(({ date }) => isWithinInterval(date, interval))
)
const getTotalAmount = getAmountByInterval({ start: new Date(0), end: new Date() });
const getAmountByYear = date => getAmountByInterval({ start: startOfYear(date), end: endOfYear(date) })
const getAmountByMonth = date => getAmountByInterval({ start: startOfMonth(date), end: endOfMonth(date) })
const getAmountByDay = date => getAmountByInterval({ start: startOfDay(date), end: endOfDay(date) })
const months = [1,2,3,4,5,6,7,8,9,10,11,12];

const iterateBy = (groupingFn, iteratorFn) =>
    compose(
        //prettier-ignore
        reverse,
        values,
        mapObjIndexed(iteratorFn),
        groupBy(({ date }) => groupingFn(date))
    );
const filterMonth = (month) => (item) => {
    return getMonth(new Date(item.date)) === month};


const iterByMonth = (items) => map(compose(
    map(el => <Month key={el.id} date={el.date} titleLabel={getAmountByMonth(el.date)(items)}>{el}</Month>),
    month => filter(filterMonth(month),items),
), months);



const Calendar = ({outlays, onOutlayClick}) => (

            <div className="outlay__list">
                <h3>Total amount spent: {getTotalAmount(outlays)}$</h3>
                {iterateBy(getYear, items => (
                    <Year key={items[0].date} date={items[0].date} titleLabel={getAmountByYear(items[0].date)(items)}>
                        {console.log("~~~~", iterByMonth(items))}
                    </Year>
                ))(outlays)}
            </div>
);


/*
*                         {
                            iterateBy(getMonth, items => (
                            <Month key={items[0].date} date={items[0].date}
                                   titleLabel={getAmountByMonth(items[0].date)(items)}>
                                {iterateBy(getDate, items => (
                                    <Day key={items[0].date} date={items[0].date}
                                         titleLabel={getAmountByDay(items[0].date)(items)}>
                                        {map(
                                            ({amount, id, title}) => (
                                                <Outlay key={id} amount={amount} id={id} title={title}
                                                        onDeleteOutlay={() => onOutlayClick(id)}/>
                                            ),
                                            items
                                        )}
                                    </Day>
                                ))(items)}
                            </Month>
                        ))(items)}
*
* */

Calendar.contextTypes = {
    store: PropTypes.object,
    outlays: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number.isRequired,
    date: PropTypes.any.isRequired})),
    onOutlayClick: PropTypes.func.isRequired,
};

export default Calendar;