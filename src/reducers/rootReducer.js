import { combineReducers } from "redux";
import { BurgerBuilder } from "./burger-builder.reducer";
import { ordersBurgerPage } from './orders-burger-page.reducer';
import { orderPurchase } from './order-purchase.reducer';
import { authentication } from './authentication.reducer';
import { error } from "./error.reducer";
import { connectRouter } from "connected-react-router";
import { history } from "../history";
import {notifications} from "./notifications.reducer";

export const rootReducer = combineReducers({
    router: connectRouter(history),
    BurgerBuilder,
    ordersBurgerPage,
    orderPurchase,
    authentication,
    notifications,
    error,
})
