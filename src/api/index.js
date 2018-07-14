import {base} from "../firebase";

export const fetchOutlays = () => {
    return base.ref("outlays").once("value").then(function(snapshot) {
        const result = snapshot.val();
        return result;
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};