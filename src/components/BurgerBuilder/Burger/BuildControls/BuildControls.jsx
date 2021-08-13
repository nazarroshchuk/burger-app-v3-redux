import React from 'react';

import classes from './BuildControls.module.css';
import { BuildControl } from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

export const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{Math.abs(props.price).toFixed(2)}</strong></p>
        { controls.map(con =>
            <BuildControl
                key={con.label}
                label={con.label}
                added={() => props.ingredientAdded(con.type)}
                remove={() => props.ingredientRemove(con.type)}
                disabled={props.disabled[con.type]}
            />
            )}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
            ORDER NOW
        </button>
    </div>
)