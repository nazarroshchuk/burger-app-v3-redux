import { notificationsActions as actionTypes } from '../constants/notifications.actions';


const initialState = {
    notification: null,
    toastMessageVisibility: false,
}

export const notifications = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NOTIFICATION_MESSAGE_TOAST:
            return {
                ...state,
                notification: action.payload,
            }
        case actionTypes.VISIBILITY_NOTIFICATION_MESSAGE_TOAST:
            return {
                ...state,
                toastMessageVisibility: action.payload,
            }
        case actionTypes.NOTIFICATION_RESET:
            return { ...initialState };
        default:
            return state;
    }
}
