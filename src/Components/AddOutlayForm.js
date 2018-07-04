import React, {Fragment} from "react"
import {v4} from "react-native-uuid";
import {store} from '../configureStore';
import {AddOutlay} from "./AddOutlay";
import {addOutlay} from '../actions';
import { base } from "../firebase"
import {fetchOutlays} from "../reducers";


class OutlayForm extends React.Component {
    render() {
        return (
            <div>
                Hi!{console.log(fetchOutlays())}
                <AddOutlay onAddClick={
                    (title, amount, date) =>
                    {addOutlay(title, amount, date);}}
                />
            </div>);
    }
}

export default OutlayForm;