import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Toast, ToastContainer } from "react-bootstrap";
import { actionErrorMessageModal } from "../../../actions/error-toast-actions";

export const ToastError = props => {

    const dispatch = useDispatch();

    const error = useSelector(state => state.error.error);
    //const criticalError = useSelector(state => state.error.criticalError);
    const isVisible = useSelector(state => state.error.toastErrorVisibility);
    const date = new  Date().toLocaleDateString();

    const onCloseHandler = () => {
        dispatch(actionErrorMessageModal.setVisibilityErrorMessageModal(false));
    }

    if (!isVisible) {
        return null;
    }

    return (
        <ToastContainer  position="top-end" style={{"zIndex": 100}} className="mt-3">
            <Toast onClick={onCloseHandler} className="d-inline-block m-1" bg={'warning'} autohide={true}  delay={5000}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{error.message || 'empty error'}</strong>
                    <small>{date}</small>
                </Toast.Header>
                <Toast.Body className={'warning' === 'Dark' && 'text-white'}>
                    {error.title || 'Something is wrong, please try later!'}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
