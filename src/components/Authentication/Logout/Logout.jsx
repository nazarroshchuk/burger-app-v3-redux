import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as authActions from '../../../actions/authentication.actions';


class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to={'/'} />
    }
}

const mapDispatchToProps = dispatch => (
    {
        onLogout: () =>  dispatch(authActions.logout()),
    }
)

const connectedLogout = connect(null, mapDispatchToProps)(Logout);
export { connectedLogout as Logout}