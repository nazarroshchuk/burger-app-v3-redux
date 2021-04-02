import * as actionsTypes from "../actions/actionsTypes";
import {init as axios} from "../services/axios-orders";

export const addIngredient = (name) => (
    {
        type: actionsTypes.ADD_INGREDIENTS,
         ingName: name,
    }
)

export const removeIngredient = (name) => (
    {
        type: actionsTypes.REMOVE_INGREDIENTS,
        ingName: name,
    }
)

export const setIngredients = (ingredients) => (
    {
        type: actionsTypes.SET_INGREDIENTS,
        payload: ingredients,
    }
)

export const setError = (err) => (
    {
        type: actionsTypes.SET_ERROR,
    }
)

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(setError());
            });
    }
}