import React from "react";
import { Route, Switch } from "react-router";
import { Layout } from './hoc/Layout/Layout';
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import {Checkout} from "./components/Checkout/Checkout";
import { Orders } from './components/Orders/Orders';
import { Authentication } from "./components/Authentication/Authentication";
import { Logout } from "./components/Authentication/Logout/Logout";

function App() {
  return (
    <div >
      <Layout>
          <Switch>
              <Route exact path='/burger-builder' component={ BurgerBuilder }/>
              <Route path='/checkout' component={ Checkout } />
              <Route path='/orders' component={ Orders } />
              <Route path='/log-out' component={ Logout } />
              <Route path='/log-in' component={ Authentication } />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
