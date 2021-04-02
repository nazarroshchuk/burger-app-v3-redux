import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions';

import { Order } from '../../components/Order/Order';
import { init as axios } from '../../services/axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { ErrorMessage } from "../../components/UI/ErrorMessage/ErrorMessage";
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount() {
       this.props.init();
    }

    render() {

        return (
            <div>
                { this.props.orders
                    ? this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            price={order.price.toFixed(2)}
                            ingredients={order.ingredients}
                        />
                    ))
                    : this.props.error ? <ErrorMessage /> : <Spinner /> }
            </div>
        );
    }
}


const mapStateToProps = state => (
    {
        orders: state.ordersBurgerPage.orders,
        error: state.ordersBurgerPage.error,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        init: () => dispatch(actions.initOrder()),
    }
}

const connectedOrder = connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));

export  { connectedOrder as Orders };
