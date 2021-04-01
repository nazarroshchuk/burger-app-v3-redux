import React from "react";
import { Logo } from "../../Logo/Logo";
import { NavigationItems } from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css';
import logo from '../../../assets/images/burger-logo.png'
import { Auxx } from "../../../hoc/Auxx/Auxx";
import { Backdrop } from "../../UI/Backdrop/Backdrop";

export const SideDrawer = (props) => {
    let attachedClasses = [ classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses  = [ classes.SideDrawer, classes.Open];
    }
    return (
        <Auxx>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo srcImg={logo}/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxx>
    );
}