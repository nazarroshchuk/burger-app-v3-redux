import React, { Component } from 'react';
import { connect } from "react-redux";
import { userSchema } from "../../../services/orderValidation";
import classes from './ContactData.module.css';

import { Button } from '../../UI/Button/Button';
import { Spinner } from '../../UI/Spinner/Spinner';
import { Input } from "../../UI/Input/Input";
import * as actions from '../../../actions';
import { Redirect } from "react-router";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'},
                        ]
                },
                value: '',
            },
        },
        isFormValid: true,
    }

    orderValidation = async () => {
        const formData = {
            name: this.state.orderForm.name.value,
            street: this.state.orderForm.street.value,
            zip: this.state.orderForm.zipCode.value,
            country: this.state.orderForm.country.value,
            email: this.state.orderForm.email.value,
            deliveryMethod: this.state.orderForm.deliveryMethod.value,
        }

        const isFormValid = await userSchema.isValid(formData);

        return isFormValid;
    }


    orderHandler = async (e) => {
        e.preventDefault();

        const isValid = await this.orderValidation()
        this.setState({ isFormValid: isValid })

        if (!this.state.isFormValid) {
            return;
        }

        const orderData = {};
        for ( const name in this.state.orderForm) {
            orderData[name] = this.state.orderForm[name].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: orderData,
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    onChangeHandler = (e, inputIdentity) => {
        this.setState({ isFormValid: true });

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentity]
        }
        updatedFormElement.value = e.target.value;
        updatedOrderForm[inputIdentity] = updatedFormElement;

        this.setState({ orderForm: updatedOrderForm });
    }

    render() {

        const formInputsArray = [];

        for ( const key in this.state.orderForm) {
            formInputsArray.push({
                id: key,
                options: this.state.orderForm[key],
            })
        }
        const purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null
        return (
            !this.props.loading
                ? (
                    <div className={classes.ContactData}>
                        {purchasedRedirect}
                        <h4>Enter your Contact Data</h4>
                        <form onSubmit={this.orderHandler}>
                            {formInputsArray.map(input => (
                                <Input
                                    key={input.id}
                                    elementType={input.options.elementType}
                                    elementConfig={input.options.elementConfig}
                                    value={input.value}
                                    changed={e => this.onChangeHandler(e, input.id)}
                                />
                            ))}
                            {!this.state.isFormValid && <p className={classes.ValidationMessage}>All inputs must be filled!</p>}
                            <Button
                                btnType='Success'
                                type={'submit'}
                            >
                                ORDER
                            </Button>
                        </form>
                    </div>)
                : <Spinner/>
        )
    }
}
const mapStateToProps = state => (
    {
        ingredients: state.BurgerBuilder.ingredients,
        price: state.BurgerBuilder.totalPrice,
        loading: state.orderPurchase.loading,
        purchased: state.orderPurchase.purchased,
        token: state.authentication.token,
    }
)

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

const connectedContactData = connect(mapStateToProps, mapDispatchToProps)(ContactData)
export {connectedContactData as ContactData}
