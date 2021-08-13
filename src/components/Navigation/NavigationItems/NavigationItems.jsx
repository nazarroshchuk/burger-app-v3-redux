import React from "react";

import classes from './NavigationItems.module.css';
import {NavigationItem} from "./NavigationItem/NavigationItem";
import {authenticationAction} from "../../../actions";
import {useDispatch, useSelector} from "react-redux";

export const NavigationItems =() => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={'/burger-builder'}>Burger Builder</NavigationItem>
            <NavigationItem link={'/orders'}>Orders</NavigationItem>
            {isAuthenticated
                ? <NavigationItem onClick={() => dispatch(authenticationAction.logout())} link={'/log-out'}>LOGOUT</NavigationItem>
                : <NavigationItem link={'/log-in'}>LOGIN</NavigationItem>
            }
        </ul>
    )
}
