import * as actions from '../actions/actionsTypes';
import axios from "axios";
import * as authURL from '../components/Authentication/authenticationURL';
import { history } from '../history';
import { user } from "../user/user";

export const authStart = () => (
    {
        type: actions.AUTH_START,
    }
)

export const authSuccess = (data) => (
    {
        type: actions.AUTH_SUCCESS,
        token: data.data.idToken,
        userId: data.data.localId,
    }
)

export const authFail = (error) => (
    {
        type: actions.AUTH_FAIL,
        payload: error,
    }
)
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(clearTokenLogout())
        }, expirationTime * 1000)
    }
}

export const clearTokenLogout = () => {
    return  { type: actions.AUTH_CLEAR_TOKEN }
}

export const logout = () => {
    return dispatch => {
        history.push('/log-in');
        user.clear();
        dispatch(setIsAuthenticated(false));
        dispatch({ type: actions.RESET_ORDERS_STATE });
        dispatch(clearTokenLogout());
    }
}

export const setIsAuthenticated = (isAuthenticated) => {
    return { type: actions.AUTH_SET_AUTHENTICATED, payload: { isAuthenticated }}
}


export const authentication = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true,
        }

        let url = isSignUp ? authURL.SIGN_UP : authURL.SIGN_IN;

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                user.store(response.data);
                dispatch(setIsAuthenticated(true));
                history.push('/burger-builder');
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}


export const authenticationAction = {
    logout,
    authentication,
}

