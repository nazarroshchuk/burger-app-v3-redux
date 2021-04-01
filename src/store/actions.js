export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';

const addIngredients = (payload) => ({type: ADD_INGREDIENTS, payload});
const removeIngredients = (payload) => ({type: REMOVE_INGREDIENTS, payload});


export const burgerBuilderActions = {
    addIngredients,
    removeIngredients,
}
