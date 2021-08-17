import React from 'react';

import classes from './BuildControls.module.css';
import { BuildControl } from './BuildControl/BuildControl';
import {useSelector} from "react-redux";

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

export const BuildControls = (props) => {
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{Math.abs(props.price).toFixed(2)}</strong></p>
            {controls.map(con =>
                <BuildControl
                    key={con.label}
                    label={con.label}
                    added={() => props.ingredientAdded(con.type)}
                    remove={() => props.ingredientRemove(con.type)}
                    disabledLess={props.disabled[con.type]}
                    disabledMore={!isAuthenticated}
                />
            )
            }
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>
        </div>
    )
}
