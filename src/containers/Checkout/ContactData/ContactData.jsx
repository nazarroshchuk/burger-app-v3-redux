import React, { Component } from 'react';

import { init as axios } from '../../../services/axios-orders';
import { userSchema } from "../../../services/orderValidation";
import classes from './ContactData.module.css';
import { Button } from '../../../components/UI/Button/Button';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../../hoc/withErrorHandler/withErrorHandler';
import {Input} from "../../../components/UI/Input/Input";

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
        loading: false,
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

        //????????????????????????
        // this.orderValidation()
        //     .then(response => this.setState({ isFormValid: response }));

        console.log(this.state.isFormValid)
        if (!this.state.isFormValid) {
            console.log('not submitted');
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

        this.setState({ loading: true });

        axios.post('/orders.json', order)
            .then(response => {
                this.props.history.push('/');
            })
            .finally(() => {
                this.setState({ loading: false });
            })
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

        console.log(this.state.isFormValid)
        const formInputsArray = [];

        for ( const key in this.state.orderForm) {
            formInputsArray.push({
                id: key,
                options: this.state.orderForm[key],
            })
        }

        return (
            !this.state.loading
                ? ( <div className={classes.ContactData}>
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
                        clicked={() => {}}
                    >
                        ORDER
                    </Button>
                </form>
            </div>)
                : <Spinner/>
        )
    }
}

export default withErrorHandler(ContactData, axios)