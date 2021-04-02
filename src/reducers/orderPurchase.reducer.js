import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false,
}


export const orderPurchase = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false,
            }
        case actionsTypes.PURCHASE_BURGER_START:
           return {
               ...state,
               loading: true,
           }
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true,
            }
        case actionsTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            }
    }
    return state;
}