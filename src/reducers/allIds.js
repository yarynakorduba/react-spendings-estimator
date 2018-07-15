import {filter} from "ramda";
import {combineReducers} from 'redux';


const allIds = () => {
    const ids = (state = [], action) => {
        switch (action.type) {
            case 'RECEIVE_OUTLAYS':
                console.log("receive");
                return action.response.map(outlay => outlay.id);
            case 'DELETE_OUTLAY':
                return filter(item => item != action.id, state);
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        switch (action.type) {
            case 'REQUEST_OUTLAYS':
                return true;
            case 'RECEIVE_OUTLAYS':
                return false;
            default:
                return state;
        }
    };

    return combineReducers({
        ids,
        isFetching
    });

};

export default allIds;
export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
