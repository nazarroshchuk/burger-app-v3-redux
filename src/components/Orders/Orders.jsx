import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions';

import { Order } from './Order';
import { init as axios } from '../../services/axios-orders';
import { Spinner } from '../UI/Spinner/Spinner';
import { ErrorMessage } from "../UI/ErrorMessage/ErrorMessage";
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import {Link} from "react-router-dom";
import {Container} from "../UI/Container/Container";

class Orders extends Component {

    componentDidMount() {
       this.props.token && this.props.init(this.props.token);
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
            </Container>
        );
    }
}


const mapStateToProps = state => (
    {
        orders: state.ordersBurgerPage.orders,
        error: state.ordersBurgerPage.error,
        token: state.authentication.token,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        init: (token) => dispatch(actions.initOrder(token)),
    }
}

const connectedOrder = connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));

export  { connectedOrder as Orders };
