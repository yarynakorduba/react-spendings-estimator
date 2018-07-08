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

class Layout extends React.Component {
    componentDidMount() {
        var result = this.fetchData();
    }

    componentDidUpdate() {
        this.fetchData();
    }

    fetchData = () => {
        console.log("IN FETCH");
        return this.props.fetchOutlays();

    };


    render() {
        const {deleteOutlay, ...rest} = this.props;
        return (<Fragment>
            <Calendar onTodoClick={deleteOutlay} {...rest}/></Fragment>);
    }
}
const mapStateToProps = (state) => {
    return {outlays: state.outlays};
};
const mapDispatchToProps = (dispatch) => {
    return actions;
};
Layout=connect(
    mapDispatchToProps,
    mapStateToProps,
)(Layout);

Layout.contextTypes = {
    store: PropTypes.object
};

export default Layout;