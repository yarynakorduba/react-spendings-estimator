import {base} from "../firebase";
import {v4} from "react-native-uuid";

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
};

export const fetchOutlays = () => {
    return base.ref("outlays").once("value").then(snapshot => {
        return snapshotToArray(snapshot);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

export const addOutlay = (title, amount, date) =>
{
        const outlay = {
        type: 'ADD_OUTLAY',
        id: v4(),
        title,
        amount: Number(amount)
    };

    return base.ref(`/outlays/${outlay.id}`).set({...outlay, date: String(date)})
        .then(() => {
            return {...outlay, date: date};
        });
};

export const deleteOutlay = (id) => {
    console.log("ID", id);
    return base.ref(`/outlays/${id}`).set(null).then(() => id);
};