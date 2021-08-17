import * as actionsTypes from '../constants/actionsTypes';
import { errorActions } from "./error-Actions";
import { actionErrorMessageModal } from "./error-toast-actions";
import { DATABASE_URL } from "../services/DATABASE_URL";

const orderSetData = (data) => (
    {
        type: actionsTypes.FETCH_ORDERS_SET_DATA,
        payload: data,
    }
)

export const initOrder = (token) => {
    return dispatch => {
        fetch(DATABASE_URL.baseURL + '/orders.json?auth=' + token)
            .then(response => response.json())
            .then(response => {
                if ('error' in response) {
                    throw new Error(response.error)
                }
                const getData = [];
                for (const key in response) {
                    getData.push({
                        ...response[key],
                        id: key
                    })
                }
                dispatch(orderSetData(getData));
            })
            .catch(error => {
                    dispatch(errorActions.error(error, error.message, 'Can\'t load your orders'));
                    dispatch(actionErrorMessageModal.setVisibilityErrorMessageModal(true));
                }
            )
    }
}

