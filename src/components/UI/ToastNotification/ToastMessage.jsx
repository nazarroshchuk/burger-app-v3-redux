import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionNotificationMessage } from "../../../actions/notification-toast-Actions";

export const ToastMessage = props => {

    const dispatch = useDispatch();


    const isVisible = useSelector(state => state.notifications.toastMessageVisibility);
    const notification = useSelector(state => state.notifications.notification);
    const date = new  Date().toLocaleDateString();

    const onCloseHandler = () => {
        dispatch(actionNotificationMessage.setVisibilityNotificationMessage(false));
    }

    if (!isVisible) {
        return null;
    }

    return (
        <ToastContainer  position="top-end" style={{"zIndex": 100}} className="mt-3">
            <Toast onClick={onCloseHandler} className="d-inline-block m-1" bg={'info'} autohide={true}  delay={5000}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{notification.message || 'empty error'}</strong>
                    <small>{date}</small>
                </Toast.Header>
                <Toast.Body className={'info' === 'Dark' && 'text-white'}>
                    {notification.title || 'Something is wrong, please try later!'}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
