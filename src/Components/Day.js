import React from "react"
import {format} from "date-fns";

export const Day = ({ date, titleLabel, children }) => (
    <div className="container__day">
        <div className="container__heading--small">
            {format(date, "d, eee")}&nbsp; ({titleLabel}$)
        </div>
        {children}
    </div>
);


