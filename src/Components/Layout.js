import React from "react"
import Calendar from "./Calendar"
import * as actions from '../actions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOutlays, getIsFetching} from "../reducers";


class Layout extends React.Component {

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const { fetchOutlays } = this.props;
        fetchOutlays();
    };


    render() {

        const {deleteOutlay, outlays, isFetching, addOutlay } = this.props;
        if (isFetching && !outlays.length) {
            return <p>Loading...</p>;
        }
        return (
            <Calendar outlays={outlays} onOutlayClick={deleteOutlay} onAdd={addOutlay}
                       />);
    }
}

Layout.propTypes = {
    outlays: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchOutlays: PropTypes.func.isRequired,
    deleteOutlay: PropTypes.func.isRequired,
    addOutlay : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
        outlays: getOutlays(state),
        isFetching: getIsFetching(state),
    });



Layout = connect(
    mapStateToProps,
    actions
)(Layout);
export default Layout;