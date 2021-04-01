import React, { Component } from 'react';
import {Route} from "react-router";

import { CheckoutSummary} from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";



export class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        },
        price: 0,
    }
    componentDidMount() {
        console.log(this.props);

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = '';
        for (let param of query.entries()) {
            // ['salad', '1']
            if(param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            console.log(param)
        }
        this.setState({ ingredients: ingredients, price: price });

        console.log(ingredients);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    price={this.props.price}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => (this.state.ingredients && <ContactData
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        {...props}
                    />)}
                />
            </div>
        )
    }
}