import { combineReducers } from "redux";
import { BurgerBuilder } from "./burgerBuilder.reducer";
import { ordersBurgerPage } from './ordersBurgerPage.reducer';
import { orderPurchase } from './orderPurchase.reducer';
import { authentication } from './authentication.reducer';
import {connectRouter} from "connected-react-router";
import { history } from "../history";

export const rootReducer = combineReducers({
    router: connectRouter(history),
    BurgerBuilder,
    ordersBurgerPage,
    orderPurchase,
    authentication,
})
