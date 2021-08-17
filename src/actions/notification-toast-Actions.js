import {notificationsActions} from "../constants/notifications.actions";

export const actionNotificationMessage = {
    setNotificationMessageModal,
    setVisibilityNotificationMessage,
}
function setNotificationMessageModal(message, title) {
    return {
        type: notificationsActions.SET_NOTIFICATION_MESSAGE_TOAST,
        payload: { message, title }
    }
}

function setVisibilityNotificationMessage(isOpen) {
    return {
        type: notificationsActions.VISIBILITY_NOTIFICATION_MESSAGE_TOAST,
        payload: isOpen,
    }
}
