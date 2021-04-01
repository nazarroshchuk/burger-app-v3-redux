import React from "react";
import { Route, Switch } from "react-router";
import { Layout } from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Checkout} from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div >
      <Layout>
          <Switch>
              <Route exact path='/' component={ BurgerBuilder }/>
              <Route path='/checkout' component={ Checkout } />
              <Route path='/orders' component={ Orders } />
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
