import * as actionsType from '../actions/actionsTypes';
import {user} from "../user/user";

const initialState = {
    token: user.current() ? user.current().idToken : null,
    userId: null,
    error: null,
    loading: false,
    isAuthenticated: user.isAuthenticated(),
}

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.AUTH_START:
            return {
                ...state,
                error: action.payload,
                loading: true,
            }
        case actionsType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case actionsType.AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case actionsType.AUTH_CLEAR_TOKEN:
            return {
                ...state,
                token: null,
                userId: null,
            }
        case actionsType.AUTH_SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        default:
            return state;
    }
}
