import React, { Component } from 'react';
import { errorActions as actions } from '../../actions/error-Actions';
import { history } from "../../history";
import { Redirect } from "react-router";
import { connect } from "react-redux";

class Shield extends Component {
    componentDidCatch(error, errorInfo) {
        this.props.dispatch(actions.criticalError(error));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { dispatch, error } = this.props;

        if (error && error.criticalError) {
            dispatch(actions.resetError());
        }
    }

     render = () => {
        const { criticalError, error = {}} = this.props.error;

        if (criticalError) {
            let pathname ;
            switch (+error.status) {
                case 401: pathname = history.location.pathname === 'log-in' ? '' : 'log-out';
                    break;
                case 403: pathname = 'forbidden';
                    break;
                case 404: pathname = 'not-found';
                    break;
                default: pathname = '/error';
            }

            if (pathname) {
                return <Redirect to={{pathname}} />
            }
        }
        return this.props.children;
     }
}

const mapStateToProps = ({ error }) => ({ error });

const connectedShield = connect(mapStateToProps)(Shield);
export { connectedShield as Shield };
