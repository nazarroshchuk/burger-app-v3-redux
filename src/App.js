import React from "react";
import {Redirect, Route, Switch} from "react-router";
import { Layout } from './hoc/Layout/Layout';
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import { Checkout } from "./components/Checkout/Checkout";
import { Orders } from './components/Orders/Orders';
import { Authentication } from "./components/Authentication/Authentication";
import { Logout } from "./components/Authentication/Logout/Logout";
import { Shield } from "./components/Errors/Shield";
import { ErrorPage } from "./components/Errors/ErrorPage";
import {ToastError} from "./components/UI/ToastNotification/ToastError";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastMessage } from "./components/UI/ToastNotification/ToastMessage";

function App() {
  return (
    <Shield>
      <Layout>
          <Switch>
              <Route exact path='/burger-builder' component={ BurgerBuilder }/>
              <Route path='/checkout' component={ Checkout } />
              <Route path='/orders' component={ Orders } />
              <Route path='/log-out' component={ Logout } />
              <Route path='/log-in' component={ Authentication } />
              <Route path='/error' component={ ErrorPage } />
              <Redirect to='/burger-builder' />
          </Switch>
      </Layout>
        <ToastError/>
        <ToastMessage />
    </Shield>
  );
}

export default App;
