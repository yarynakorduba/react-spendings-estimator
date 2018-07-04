import React from 'react';
import {format} from "date-fns";

export const Year = ({ date, titleLabel, children }) => (
    <div className="container__year">
        <div className="container__heading--small">
            {format(date, "yyyy")}&nbsp; ({titleLabel}$)
        </div>
        {children}
    </div>
);