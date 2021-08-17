import { errorActions } from "../constants/error.actions";


export const actionErrorMessageModal = {
    setErrorMessageModal,
    setVisibilityErrorMessageModal
}
function setErrorMessageModal(message, title) {
    return {
        type: errorActions.NOTIFICATION_ADD_ERROR_MESSAGE_MODAL,
        payload: { message, title }
    }
}

function setVisibilityErrorMessageModal(isOpen) {
    return {
        type: errorActions.VISIBILITY_NOTIFICATION_ADD_ERROR_MESSAGE_MODAL,
        payload: isOpen,
    }
}
