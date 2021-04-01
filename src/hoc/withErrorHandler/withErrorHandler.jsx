import React, { Component } from "react";

import { Modal } from "../../components/UI/Modal/Modal";
import { Auxx } from "../Auxx/Auxx";

export const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null,
            reqInterceptor: null,
            resInterceptor: null,
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
                console.log(this.state.error);
            });
        }

        componentWillUnmount() {
            //clear memory after disappearing our component
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxx>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxx>
            )
        }
    }
}

