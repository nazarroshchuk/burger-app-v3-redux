import React from "react";

import classes from './Toolbar.module.css'
import { Logo } from "../../Logo/Logo";
import logo from '../../../assets/images/burger-logo.png'
import { NavigationItems } from "../NavigationItems/NavigationItems";
import { MenuBtn } from "../MenuBtn/MenuBtn";
export const Toolbar = ({isAuth, openSideDrawer}) => (
    <header className={classes.Toolbar}>
        <MenuBtn  open={openSideDrawer}></MenuBtn>
        <Logo srcImg={logo} height='80%' />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={isAuth}/>
        </nav>
    </header>
);