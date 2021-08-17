import * as actionsTypes from '../constants/actionsTypes';

import { actionErrorMessageModal } from "./error-toast-actions";
import { DATABASE_URL } from "../services/DATABASE_URL";
import { errorActions } from "./error-Actions";
import { actionNotificationMessage } from "./notification-toast-Actions";
import { history } from "../history";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const setPurchaseBurgerLoadingStatus = (isLoading) => {
    return {
        type: actionsTypes.PURCHASE_BURGER_LOADING_STATUS,
        payload: { loading: isLoading },
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionsTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerInit = () => (
    {
        type: actionsTypes.PURCHASE_BURGER_INIT,
    }
)


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(setPurchaseBurgerLoadingStatus(true));
        fetch(DATABASE_URL.baseURL + 'orders.json?auth=' + token, {
            method: 'POST',
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (response.status === 401) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(response => {
                dispatch(purchaseBurgerSuccess(response, orderData))
                dispatch(actionNotificationMessage.setNotificationMessageModal('Order id done successfully!', 'We will call you!'));
                dispatch(actionNotificationMessage.setVisibilityNotificationMessage(true));
            })
            .catch(error => {
                console.log(error);
                history.push('/')
                dispatch(errorActions.unexpectedError(error));
                dispatch(actionErrorMessageModal.setVisibilityErrorMessageModal(true));
            })
            .finally(() => {
                dispatch(setPurchaseBurgerLoadingStatus(false));
            })
    }
}
