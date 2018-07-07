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
import {fetchOutlays} from "../reducers";

class Layout extends React.Component {
    componentDidMount() {
        console.log('MOUNT');
        var result = this.fetchData();
        console.log(result);
    }

    componentDidUpdate() {
        this.fetchData();
    }

    fetchData = () => {
        return fetchOutlays().then(
            function(response) {},
        function(error) {}
        );
    }


    render() {
        return (<Fragment>
            <Calendar {...this.props}/></Fragment>);
    }
}
const mapStateToProps = (state) => {
    return {outlays: state.outlays};
};
const mapDispatchToProps = (dispatch) => {
    return {deleteOutlay:deleteOutlay};
};
Layout=connect(
    mapDispatchToProps,
    mapStateToProps,
)(Layout);

Layout.contextTypes = {
    store: PropTypes.object
};

export default Layout;