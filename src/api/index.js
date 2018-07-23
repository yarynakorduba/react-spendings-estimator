import {base} from "../firebase";
import {v4} from "react-native-uuid";
import {parse } from "date-fns";

export const fetchOutlays = () => {
    return base.ref("outlays").once("value").then(function(snapshot) {
        const result = snapshot.val();
        return result;
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};

export const addOutlay = (title, amount, date) =>
{
console.log(typeof newDate);
        const outlay = {
        type: 'ADD_OUTLAY',
        id: v4(),
        title,
        amount: Number(amount),
    };
    var result = fetchOutlays().then(result => {
        var newList = (result != null) ? [...result, {...outlay, date: String(date)}] :
            [{...outlay, date: String(date)}];
        base.ref(`/outlays`).set(newList);
        return {...outlay, date: date};
        }
    );


    return result;


};