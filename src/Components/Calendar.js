import React, {Fragment} from "react"
import {compose, map, keys, path, reverse, sortBy, prop} from "ramda"
import {v1} from 'react-native-uuid'
import {format} from "date-fns";

const Calendar = ({cost_list, deleteOutlay, amountsForPeriods}) =>
    !(cost_list) ? null : (
        <Fragment>
            <div className="container">
                <h3>Total amount spent: {prop("total", amountsForPeriods) || "..."}</h3>
                {compose(
                    map(year => <div className="container__year" key={v1()}>
                        <div className="container__heading--small">{year}&nbsp;
                            ({amountsForPeriods[year]}$)</div>
                        {compose(
                            map((month) => <div className="container__month" key={v1()}>
                                <div className="container__heading--small">
                                    {format(new Date(1, month, 1), "MMMM")}&nbsp;
                                    ({amountsForPeriods[format(new Date(year, month),
                                    "YYYY-MM")]}$)
                                </div>
                                {compose(
                                    map(day => <div className="container__day" key={v1()}>
                                        <div className="container__heading--small">
                                            {day},
                                            {format(new Date(year, month, day), "ddd")}&nbsp;
                                                ({amountsForPeriods[format(new Date(year, month, day),
                                            "YYYY-MM-DD")]}$)
                                                </div>
                                        {compose(
                                            map(
                                                (item) =>
                                                    <div className="container__spending" key={v1()}>
                                                        {cost_list[year][month][day][item].amount}
                                                        $&nbsp;{cost_list[year][month][day][item].title}
                                                    <button className="item__button" onClick={() =>
                                                        deleteOutlay(cost_list[year][month][day][item].id)}>x</button>
                                                    </div>
                                            ),
                                            reverse(),
                                            keys,
                                            path([year, month, day])
                                        )(cost_list)
                                        }

                                    </div>),
                                    reverse(),
                                    keys,
                                    path([year, month])
                                )(cost_list)
                                }
                            </div>),
                            reverse(),
                            keys,
                            path([year]))(cost_list)
                        }
                    </div>),
                    sortBy(prop("date")),
                    reverse(),
                    keys)(cost_list)}
            </div>
        </Fragment>
    );

export default Calendar;
