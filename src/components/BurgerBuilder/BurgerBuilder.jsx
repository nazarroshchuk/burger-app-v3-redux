import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper } from '../UI/Wrapper/Wrapper';
import { Burger } from './Burger/Burger';
import { BuildControls } from './Burger/BuildControls/BuildControls';
import { Modal  } from "../UI/Modal/Modal";
import { OrderSummary } from './Burger/OrderSummary/OrderSummary';
import classes from './BurgerBuilder.module.css';
import { Spinner } from '../UI/Spinner/Spinner';
import * as actions from "../../actions";
import { Container } from "../UI/Container/Container";
import { errorActions } from "../../actions";
import { LoginRequest } from "../UI/LoginRequest/LoginRequest";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount = () => this.props.init();


    componentWillUnmount = () => this.props.resetError();


    // gives total sum all added ingredients
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((sum, el) => sum + el, 0);

        return  sum >   0;
    }

    purchaseHandler = () => {
        this.setState((state) => ({purchasing: !state.purchasing}))
    }

    purchaseCancel = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinue = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabled = { ...this.props.ingredients}
        for ( const key in disabled) {
            disabled[key] = disabled[key] <= 0
        }

        const errorMessage = this.props.error.message
            ? (<div style={{ color: 'orange', textAlign: 'center'}}>{this.props.error.message}</div>)
            : <Container><p style={{ color: 'orange', textAlign: 'center'}}>Something is wrong, please try later!</p></Container>

        return (
            !this.props.error
            ?
                (
                    this.props.ingredients && !this.props.error
                    ? (
                        <Wrapper>
                            {/*{ this.state.purchasing &&*/}
                            {/*// visibility was implemented with help  styling CSS in Modal component//*/}
                            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
                                <OrderSummary
                                    ingredients={this.props.ingredients}
                                    cancelBtn={this.purchaseCancel}
                                    continueBtn={this.purchaseContinue}
                                    totalPrice={this.props.totalPrice}
                                />
                            </Modal>
                            <Wrapper>
                                <Burger ingredients={this.props.ingredients}/>
                                {!this.props.isAuthenticated && <LoginRequest />}
                                <BuildControls
                                    ingredientAdded={this.props.onIngredientAdded}
                                    ingredientRemove={this.props.onIngredientRemoved}
                                    disabled={disabled}
                                    price={this.props.totalPrice}
                                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                                    ordered={this.purchaseHandler}
                                />
                            </Wrapper>
                        </Wrapper>
                        )
                        : <Spinner addClass={classes.SpinnerBuilderContainer}/>
                )
            :  errorMessage
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.BurgerBuilder.ingredients,
        totalPrice: state.BurgerBuilder.totalPrice,
        error: state.error.error,
        isAuthenticated: state.authentication.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        init: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseBurgerInit()),
        resetError: () => dispatch(errorActions.resetError())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
