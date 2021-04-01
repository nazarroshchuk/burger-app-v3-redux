import React from 'react';

import classes from './MenuBtn.module.css'

export const MenuBtn = (props) => (
    <div
        className={classes.MenuBtn}
        onClick={props.open}
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
)