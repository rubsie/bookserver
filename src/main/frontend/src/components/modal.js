import React, {useCallback, useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useMessageContext} from "../contexts/messagecontext";
import {Message} from "./message";


export function useModalWithFormProps(initialObject) {
    const [tempObject, setTempObject] = useState(initialObject);
    const firstInputRefElement = useRef(null);

    const onChange = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = e.target.value;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    return {tempObject, setTempObject, firstInputRefElement, onChange};
}


export function ModalWithFormContent(props) {
    const {modalWithFormProps, title, isOpen, close, doSubmit, initialMessage} = props;
    const {tempObject, firstInputRefElement} = modalWithFormProps;
    const {setMessage, clearAllMessages} = useMessageContext();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`SUBMIT ModalWithForm ${title}`);
        const result = await doSubmit(tempObject);
        if (result) close()
        else if (firstInputRefElement.current) firstInputRefElement.current.focus();
    }

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (isOpen) {
            if (firstInputRefElement.current) firstInputRefElement.current.focus();
            clearAllMessages();
            setMessage(initialMessage);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return <>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={e => handleSubmit(e)}>
            <Modal.Body>
                <Message/>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">{title}</Button>
            </Modal.Footer>
        </Form></>;
}
