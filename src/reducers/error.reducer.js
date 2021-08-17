import { errorActions as actionTypes } from '../constants/error.actions';

const initialState = {
    criticalError: false,
    error: false,
    toastErrorVisibility: false,
}

export const error = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CRITICAL_ERROR:
            return { criticalError: true, error: action.error || 'error' };
        case actionTypes.NOTIFICATION_ADD_ERROR_MESSAGE_MODAL:
            return {
                ...state,
                error: action.payload,
            }
        case actionTypes.VISIBILITY_NOTIFICATION_ADD_ERROR_MESSAGE_MODAL:
            return {
                ...state,
                toastErrorVisibility: action.payload,
            }
        case actionTypes.ERROR_RESET:
            return { ...initialState };
        default:
            return state;
    }
}
