import { errorActions as actionTypes } from "../constants/error.actions";
import { errorMessages } from "../constants/error.messages";
import jsonUtils  from '../services/utils/json-utils';
import { actionErrorMessageModal } from "./error-toast-actions";

export const errorActions = {
    criticalError,
    error,
    unexpectedError,
    resetError,
}

function criticalError(error) {
    return {
        type: actionTypes.CRITICAL_ERROR,
        error
    };
}

function error(error, message, caption) {
    console.log(error)
   if (error && +error === 401) {
        return criticalError(error);
    }

    const errorJson = error && error.message && jsonUtils.tryParse(error.message);
    message = (errorJson && errorJson.error) || message;
    caption = (errorJson && errorJson.title) || caption;

    return actionErrorMessageModal.setErrorMessageModal(message, caption || errorMessages.error);
}

function unexpectedError(err) {
    return error(err, errorMessages.unexpectedError);
}

function resetError() {
    return { type: actionTypes.ERROR_RESET }
}
