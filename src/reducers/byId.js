import React from "react"

export const byId = (state={}, action) => {
    switch (action.type) {
        case 'RECEIVE_OUTLAYS':
            const nextState = {...state};

            action.response.forEach(outlay => {
                nextState[outlay.id] = outlay;
            });
            return nextState;
        default:
            return state;
    }
};

export default byId;

export const getOutlay = (state, id) => state[id];