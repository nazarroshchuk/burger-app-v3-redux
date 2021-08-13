import React from "react";
import { Logo } from "../../Logo/Logo";
import { NavigationItems } from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import logo from '../../../assets/images/burger-logo.png'
import { Wrapper } from "../../../hoc/Wrapper/Wrapper";
import { Backdrop } from "../../UI/Backdrop/Backdrop";

export const SideDrawer = ({isAuth, open, closed}) => {
    let attachedClasses = [ classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses  = [ classes.SideDrawer, classes.Open];
    }
    return (
        <Wrapper>
            <Backdrop show={open} clicked={closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo srcImg={logo}/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuth}/>
                </nav>
            </div>
        </Wrapper>
    );
}
