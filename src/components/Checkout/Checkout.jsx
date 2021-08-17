import React, { Component } from 'react';
import {Redirect, Route} from "react-router";
import { connect } from "react-redux";

import { CheckoutSummary} from "../Order Confirmation/CheckoutSummary/CheckoutSummary";
import { ContactData } from "./ContactData/ContactData";



class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return ( this.props.ingredients
                ?
            (<div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
            )
                : <Redirect to={'/'} />
        )
    }
}

const mapStateToProps = state => (
    {
        ingredients: state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice,
    }
)

const connectedCheckout = connect(mapStateToProps)(Checkout);
export { connectedCheckout as Checkout };
