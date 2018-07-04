import React from "react"
import {format} from "date-fns"

export const Month = ({ date, titleLabel, children }) => (
    <div className="container__month">
        <div className="container__heading--small">
            {format(date, "MMMM")}&nbsp; ({titleLabel}$)
        </div>
        {children}
    </div>
);
