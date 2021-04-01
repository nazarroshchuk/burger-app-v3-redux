import React, { Component } from "react";
import { Auxx } from '../Auxx/Auxx';
import classes from './Layout.module.css'
import {Toolbar} from "../../components/Navigation/Toolbar/Toolbar";
import {SideDrawer} from "../../components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component  {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState(state => ({ showSideDrawer: !state.showSideDrawer}))
    }
    render() {
       return (
           <Auxx>
               <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
               <SideDrawer
                   open={this.state.showSideDrawer}
                   closed={this.sideDrawerClosedHandler}
               />
               <main className={classes.Content}>
                   {this.props.children}
               </main>
           </Auxx>
       )
    }
}