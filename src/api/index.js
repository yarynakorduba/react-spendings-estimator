import {base} from "../firebase";

export const fetchOutlays = () => {
    let result;
    console.log("FETCH");
    return base.ref("outlays").once("value").then(function(snapshot) {
        return snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    // return result;
};