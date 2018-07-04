import React, { Fragment } from "react"
import Calendar from "./Calendar"
import AddOutlayForm from "./AddOutlayForm"
import {deleteOutlay} from '../actions'
import PropTypes from 'prop-types'
import { base } from "../firebase"
import { filter, map, compose, applySpec } from "ramda"
import {connect} from 'react-redux'
import { v1 } from "react-native-uuid"
import { parse } from "date-fns"
import {withRouter} from 'react-router'

const mapStateToProps = (state) => {
    return {outlays: state.outlays};
};
const mapDispatchToProps = (dispatch) => {
    return {deleteOutlay:deleteOutlay};
};
const Layout=connect(
    mapDispatchToProps,
    mapStateToProps,
)(Calendar);

Layout.contextTypes = {
    store: PropTypes.object
};

export default Layout;