import {filter} from "ramda";
import {combineReducers} from 'redux';


const allIds = () => {
    const ids = (state = [], action) => {
        if (action.response == null) {
            return state;
        }
        switch (action.type) {
            case 'FETCH_OUTLAYS_SUCCESS':
                return action.response.map(outlay => outlay.id);
            case 'ADD_OUTLAY_SUCCESS':
                return [...state, action.response.id];
                case 'DELETE_OUTLAY':
                return filter(item => item != action.id, state);
            default:
                return state;
        }
    };

    const isFetching = (state = false, action) => {
        switch (action.type) {
            case 'FETCH_OUTLAYS_REQUEST':
                return true;
            case 'FETCH_OUTLAYS_SUCCESS':
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
