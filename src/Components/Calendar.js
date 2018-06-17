import React, {Fragment} from "react"
import "../css/custom-styles.css"
import {compose, sum, pipe,
    map, keys, path, groupBy, reverse, sortBy, reduceRight, add, prop} from "ramda"
import {v1} from 'react-native-uuid'
import {getMonth, getDate, getDay, getYear, format, addMonths} from "date-fns";

const sortByDates =sortBy(prop("date"));
const groupByDates = pipe(
    groupBy(({date}) => getYear(date)),
    map(groupBy(({date}) => getMonth(date))),
    map(map(groupBy(({date}) => getDate(date))))
);
// const sumByDates = pipe(
//     groupByDates(),
//     reduceRight(add, 0, )
// )

const Calendar = ({cost_list, deleteCosts, total_costs}) =>

    cost_list === "Null" ? "No item yet" : (
        <Fragment>
            <div className="container">
                <h3>Total costs spent: {total_costs || "..."}</h3>
                {compose(

                    map(year => <div className="container__year" key={v1()}>
                        <div className="container__heading--small">{year}</div>
                        {compose(
                            map(month => <div className="container__month" key={v1()}>
                                <div className="container__heading--small">
                                    {format(addMonths(new Date(month), 1), "MMMM")}
                                </div>
                                {compose(
                                    map(day => <div className="container__day" key={v1()}>
                                        <div className="container__heading--small">
                                            {day},
                                            {format(getDay(new Date(year, month, day)),
                                                "ddd")}

                                                </div>
                                        {compose(
                                            map(
                                                (item) =>
                                                    <div className="container__spending" key={v1()}>
                                                        {groupByDates(cost_list)[year][month][day][item].cost}
                                                        {groupByDates(cost_list)[year][month][day][item].title} $
                                                    <button className="item__button" onClick={() => deleteCosts(groupByDates(cost_list)[year][month][day][item].id,
                                                        groupByDates(cost_list)[year][month][day][item].cost)}>x</button>
                                                    </div>
                                            ),
                                            reverse(),
                                            keys,
                                            path([year, month, day])
                                        )(groupByDates(cost_list))
                                        }
                                    </div>),
                                    reverse(),
                                    keys,
                                    path([year, month])
                                )(groupByDates(cost_list))
                                }
                            </div>),
                            reverse(),
                            keys,
                            path([year]))(groupByDates(cost_list))
                        }
                    </div>),

                    sortByDates(),
                    reverse(),
                    keys,
                    path([])
                )(groupByDates(cost_list))}
            </div>
        </Fragment>
    );

export default Calendar;
