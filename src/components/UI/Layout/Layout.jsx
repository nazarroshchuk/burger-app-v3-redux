import React, { Component } from "react";
import { Wrapper } from '../Wrapper/Wrapper';
import classes from './Layout.module.css'
import { Toolbar } from "../../Navigation/Toolbar/Toolbar";
import { SideDrawer } from "../../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component  {
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
           <Wrapper>
               <Toolbar
                   openSideDrawer={this.sideDrawerOpenHandler}
                   isAuth={this.props.isAuthenticated}
               />
               <SideDrawer
                   open={this.state.showSideDrawer}
                   closed={this.sideDrawerClosedHandler}
                   isAuth={this.props.isAuthenticated}
               />
               <main className={classes.Content}>
                   {this.props.children}
               </main>
           </Wrapper>
       )
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.authentication.token !== null,
    }
)

const connectedLayout = connect(mapStateToProps)(Layout);
export { connectedLayout as Layout }
