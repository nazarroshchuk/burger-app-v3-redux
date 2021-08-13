import React from 'react';
import {Burger} from "../../BurgerBuilder/Burger/Burger";
import {Button} from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css';

export const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}
            >
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}
            >
                CONTINUE
            </Button>
        </div>
    )
}
