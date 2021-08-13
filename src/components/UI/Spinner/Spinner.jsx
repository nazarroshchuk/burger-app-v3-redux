import React from 'react';
import classes from './Spinner.module.css';

export const Spinner = ({ addClass = '' }) => (
    <div className={ addClass }>
        <div className={classes.loader}></div>
    </div>
)