import React, { Fragment } from "react"
import Calendar from "./Calendar"
import AddOutlayForm from "./AddOutlayForm"
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { base } from "../firebase"
import { filter, map, compose, applySpec } from "ramda"
import {connect} from 'react-redux'
import { v1 } from "react-native-uuid"
import { parse } from "date-fns"
import {withRouter} from 'react-router'
import {getOutlays} from "../reducers";
import {fetchOutlays} from "../api";

class Layout extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        const { fetchOutlays } = this.props;
        fetchOutlays();

    };


    render() {
        const {deleteOutlay, ...rest} = this.props;
        return (
            <Calendar {...rest} onTodoClick={deleteOutlay}
                       />);
    }
}
const mapStateToProps = (state) => {
    return {outlays: getOutlays(state)};
};


Layout=connect(
    mapStateToProps,
    actions
    )(Layout);


export default Layout;