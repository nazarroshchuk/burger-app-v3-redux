import React, { Component } from 'react';

import { Order } from '../../components/Order/Order';
import { init as axios } from '../../services/axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: null,
        isLoad: false,
    }

    componentDidMount() {
        this.setState({ isLoad: true})
        axios.get('/orders.json')
            .then(response => {
                const getData = [];
                for (const key in response.data) {
                    getData.push({
                        ...response.data[key],
                        id: key
                    })
                }

               this.setState({ orders: getData });
            })
            .catch(err => err)
            .finally(() => {
                this.setState({ isLoad: false });
            })
    }

    render() {

        return (
            <div>
                { this.state.orders
                    ? this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            price={order.price.toFixed(2)}
                            ingredients={order.ingredients}
                        />
                    ))
                    : this.state.isLoad ? <Spinner /> : null }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);