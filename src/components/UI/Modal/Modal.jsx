import React from 'react';

import classes from './Modal.module.css';
import { Wrapper } from "../Wrapper/Wrapper";
import { Backdrop } from "../Backdrop/Backdrop";

export class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Wrapper>
        )
    }
}
