import * as actionsTypes from '../constants/actionsTypes';

const initialState = {
    orders: null,
    success: null,
    error: null,
}

export const ordersBurgerPage = (state = initialState, action) =>  {
    switch (action.type) {
        case actionsTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: true,
            }
        case actionsTypes.FETCH_ORDERS_SET_DATA:
            return {
                ...state,
                orders: action.payload,
                success: true,
                error: false,
            }
        case actionsTypes.RESET_ORDERS_STATE:
            console.log('reset')
            return {...initialState}
        default: return state;
    }
}
