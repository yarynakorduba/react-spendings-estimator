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
import {getOutlays, getIsFetching} from "../reducers";
import {fetchOutlays} from "../api";

class Layout extends React.Component {

    componentDidMount() {
        console.log("MOUNT");
        this.fetchData();
    }


    fetchData() {
        console.log("MOUNT");
        const { fetchOutlays, requestOutlays } = this.props;
        requestOutlays();
        fetchOutlays();
    };


    render() {
        const {deleteOutlay, outlays, isFetching} = this.props;
        if (isFetching && !outlays.length) {
            return <p>Loading...</p>;
        }
        return (
            <Calendar outlays={outlays} onTodoClick={deleteOutlay}
                       />);
    }
}

Layout.propTypes = {
    outlays: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    requestOutlays: PropTypes.func.isRequired,
    fetchOutlays: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
    console.log("!!!!!!!", state);
    return {
        outlays: getOutlays(state),
        isFetching: getIsFetching(state),

    };
};


Layout=connect(
    mapStateToProps,
    actions
    )(Layout);


export default Layout;