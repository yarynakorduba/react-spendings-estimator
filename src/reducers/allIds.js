import {filter} from "ramda";

const allIds = (state=[], action) => {
    switch(action.type) {
        case 'RECEIVE_OUTLAYS':
            console.log(allIds);
            return action.response.map(outlay => outlay.id);
        // case 'ADD_OUTLAY':
        //     console.log("here");
        //     var data = {action};
        //     base.ref(`outlays`).set(
        //         data
        //     );
        //     return [...state, action.id];
        case 'DELETE_OUTLAY':
            return filter(item => item != action.id, state );
        default:
            return state;
    }
};

export default allIds;
export const getIds = (state) => state;
