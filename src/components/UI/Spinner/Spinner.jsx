import React from 'react';
import classes from './Spinner.module.css';

export const Spinner = () => (
    <div className={classes.ContainerLoader}>
        <div className={classes.loader}>Loading...</div>
    </div>
)