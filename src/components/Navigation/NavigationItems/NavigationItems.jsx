import React from "react";

import classes from './NavigationItems.module.css'
import {NavigationItem} from "./NavigationItem/NavigationItem";


export const NavigationItems =(props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/'}>Burger Builder</NavigationItem>
        <NavigationItem link={'/orders'}>Orders</NavigationItem>
    </ul>
)