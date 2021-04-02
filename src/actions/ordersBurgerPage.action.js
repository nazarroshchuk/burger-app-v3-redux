import * as actionsTypes from '../actions/actionsTypes';
import {init as axios} from "../services/axios-orders";

const orderFailAction = () => (
    {
        type: actionsTypes.FETCH_ORDERS_FAIL,
    }
)

const orderSetData = (data) => (
    {
        type: actionsTypes.FETCH_ORDERS_SET_DATA,
        payload: data,
    }
)

export const initOrder = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
                const getData = [];
                for (const key in response.data) {
                    getData.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(orderSetData(getData));
            })
            .catch(err =>
                dispatch(orderFailAction())
            )

    }
}

