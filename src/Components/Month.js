import React from "react"
import {format, startOfMonth, getDay} from "date-fns"
import {times} from 'ramda';
import {v4} from 'react-native-uuid';

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Month = ({ date, titleLabel, children }) => {
    let startMargin = [];
    const addMargin = function() {
        startMargin.push(<span className="day" key={v4()}></span>);
        return startMargin;
    };

    times(addMargin, (getDay(startOfMonth(date)) % 6));

    return (
    <div className="month">
        <div className="heading--small">
            {format(date, "MMMM")}&nbsp; ({titleLabel}$)
        </div>
        {WEEKDAYS.map(day => <span key={v4()} className="month__weekdays">{day}</span>)}
        {startMargin}
        {children}
    </div>);
};
