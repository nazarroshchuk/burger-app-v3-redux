import React, { Component } from "react";
import { connect } from "react-redux";

import { Auxx } from '../../hoc/Auxx/Auxx';
import { Burger } from '../../components/Burger/Burger';
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls';
import { Modal  } from "../../components/UI/Modal/Modal";
import { OrderSummary } from '../../components/Burger/OrderSummary/OrderSummary';
import { init as axios } from '../../services/axios-orders';
import { Spinner } from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from "../../actions/index";





class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        errorInit: false,
    }

    componentDidMount() {
        this.props.init();
    }

    // gives total sum all added ingredients
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => ingredients[ingKey])
            .reduce((sum, el) => sum + el, 0);

        return  sum >   0;
    }

    purchaseHandler = () => {
        if (this.state.purchasing) {
            alert('Sending your order...')
        }
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

        const errorMessage = this.props.errorInit
            && (<div style={{ color: 'orange', textAlign: 'center'}}>Something is wrong, please try later!</div>)

        return (
            !this.props.errorInit
            ?
                (
                    this.props.ingredients
                    ? (
                        <Auxx>
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
                            <Auxx>
                                <Burger ingredients={this.props.ingredients}/>
                                <BuildControls
                                    ingredientAdded={this.props.onIngredientAdded}
                                    ingredientRemove={this.props.onIngredientRemoved}
                                    disabled={disabled}
                                    price={this.props.totalPrice}
                                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                                    ordered={this.purchaseHandler}
                                />
                            </Auxx>)
                        </Auxx>
                        )
                        : <Spinner />
                )
            :  errorMessage
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.BurgerBuilder.ingredients,
        totalPrice: state.BurgerBuilder.totalPrice,
        errorInit: state.BurgerBuilder.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        init: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseBurgerInit()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios ));