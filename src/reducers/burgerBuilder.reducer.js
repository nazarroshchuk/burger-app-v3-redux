import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

export const BurgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                   [action.ingName]: state.ingredients[action.ingName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName],
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                error: false,
                totalPrice: 0,
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                ingredients: action.payload,
                error: true,
            }
    }
    return state;
}
