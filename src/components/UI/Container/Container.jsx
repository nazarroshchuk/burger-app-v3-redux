import React from "react";
import classes from './Container.module.css';

export const Container = ({children, className = ''}) => {
    return (
        <div className={`${classes.container} ${className}`}>{children}</div>
    )
}
