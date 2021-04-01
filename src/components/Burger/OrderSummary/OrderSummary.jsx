import React from 'react';
import {Auxx} from "../../../hoc/Auxx/Auxx";
import {Button} from "../../UI/Button/Button";

export class OrderSummary extends React.Component {
    // This could be a functional component, doesn't have to be a class component
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return [...Array(this.props.ingredients[ingKey])]
                    .map((_, i) => ingKey) // turn into an array of keys according to the amount each key
            }).filter(el => el.length > 0)
            .map((el, i) =>
                <li key={el[0] + el.length}>
                    <span style={{textTransform: 'capitalize'}}>{`${el[0]}: ${el.length}`}</span>
                </li>);

        //Variant with staticList
        // const ingredientSummary = Object.keys(props.ingredients)
        //     .map(ingKey => {
        //     return (
        //         <li key={ingKey}>
        //             <span style={{ textTransform: 'capitalize' }}>{ingKey}: {props.ingredients[ingKey]} </span>
        //         </li>
        //     )
        // })

        return (
            <Auxx>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.cancelBtn}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continueBtn}>CONTINUE</Button>
            </Auxx>
        )
    }
}