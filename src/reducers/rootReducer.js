import { combineReducers } from "redux";
import { BurgerBuilder } from "./burgerBuilder.reducer";
import { ordersBurgerPage } from './ordersBurgerPage.reducer';
import { orderPurchase } from './orderPurchase.reducer';

export const rootReducer = combineReducers({
    BurgerBuilder,
    ordersBurgerPage,
    orderPurchase,
})