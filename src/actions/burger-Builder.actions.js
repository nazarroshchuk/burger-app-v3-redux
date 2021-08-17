import * as actionsTypes from "../constants/actionsTypes";
import { errorActions } from "./error-Actions";
import { DATABASE_URL } from "../services/DATABASE_URL";
import { actionErrorMessageModal } from "./error-toast-actions";

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

export const initIngredients = () => {
    return async dispatch => {
        fetch(DATABASE_URL.baseURL + '/ingredients.json')
            .then(response => response.json())
            .then(response => {
                dispatch(setIngredients(response))
            })
            .catch(error => {
                dispatch(errorActions.error(error, error.message, 'Can\'t load ingredients data' ));
                dispatch(actionErrorMessageModal.setVisibilityErrorMessageModal(true));
            });
    }
}
