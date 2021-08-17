import React from 'react';

import classes from './BuildControl.module.css';

export const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.remove}
            disabled={props.disabledLess}
        >
            Less
        </button>
        <button
            className={classes.More}
            onClick={props.added}
            disabled={props.disabledMore}
        >
            More
        </button>
    </div>
)
