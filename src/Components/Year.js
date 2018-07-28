import React from 'react';
import {format} from "date-fns";

export const Year = ({ date, titleLabel, children }) => (
    <div className="year">
        <div className="heading--small">
            {format(date, "yyyy")}&nbsp; ({titleLabel}$)
        </div>
        {children}
    </div>
);