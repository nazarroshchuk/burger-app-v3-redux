import React from "react";

import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom';

export const NavigationItem = (props) => (
    <li className={classes.NavigationItem} >
        <NavLink
            exact
            to={props.link}
            activeClassName={classes.Active}
        >
            {props.children}
        </NavLink>
    </li>
)
