import React from "react"

const byId = (state={}, action) => {
    switch (action.type) {
        case 'RECEIVE_OUTLAYS':
            const nextState = {...state};
            if (action.response != null) {
            action.response.forEach(outlay => {
                nextState[outlay.id] = outlay;
            });}
            return nextState;
        default:
            return state;
    }
};

export default byId;

export const getOutlay = (state, id) => state[id];