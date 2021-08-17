import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions';

import { Order } from './Order';
import { Spinner } from '../UI/Spinner/Spinner';
import { ErrorMessage } from "../UI/ErrorMessage/ErrorMessage";
import classes from './Orders.module.css';
import { Link } from "react-router-dom";
import { Container } from "../UI/Container/Container";
import { errorActions } from "../../actions";

class Orders extends Component {

    componentDidMount() {
       this.props.token && this.props.init(this.props.token);
    }

    componentWillUnmount() {
       this.props.resetError();
    }

    render() {

        return (
            <Container className={classes.Orders}>
                { this.props.orders && this.props.token
                    ? this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            price={order.price.toFixed(2)}
                            ingredients={order.ingredients}
                        />
                    ))
                    : this.props.error ? <ErrorMessage /> : this.props.token && <Spinner addClass={classes.SpinnerOrderContainer} />
                }
                {!this.props.token && <p>You need to <Link to={'/log-in'}>log in</Link> to see your pre-orders!</p>}
                {this.props.orders && !this.props.orders.length && <p>Your Order List is empty yet!</p>}
            </Container>
        );
    }
}


const mapStateToProps = state => (
    {
        orders: state.ordersBurgerPage.orders,
        error: state.error.error,
        token: state.authentication.token,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        init: (token) => dispatch(actions.initOrder(token)),
        resetError: () => dispatch(errorActions.resetError()),
    }
}

const connectedOrder = connect(mapStateToProps,mapDispatchToProps)(Orders);

export  { connectedOrder as Orders };
