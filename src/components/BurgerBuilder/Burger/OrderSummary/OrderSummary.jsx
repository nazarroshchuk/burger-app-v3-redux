import React from 'react';
import {Wrapper} from "../../../UI/Wrapper/Wrapper";
import {Button} from "../../../UI/Button/Button";

export class OrderSummary extends React.Component {

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

        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.cancelBtn}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continueBtn}>CONTINUE</Button>
            </Wrapper>
        )
    }
}
