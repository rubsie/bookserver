import React, {useCallback, useEffect, useRef, useState} from "react";
import {useMessageContext} from "../contexts/messagecontext";
import {Message} from "./message";
import {Button, Form, Modal} from "react-bootstrap";

/** Usage:
 * Component ModalWithForm creates a modal that will be open if prop isOpen is truthy.
 * Content of the Modal is predefined in Component ModalWithFormContent.
 * You can also use ModalWithFormContent directly (if you want to define the modal yourself).
 * You need to  use the context usePropsForModalWithInitializer or usePropsForModalWithInitialObject
 * -- it initializes everything the ModalWithFormContent needs and that you want to use inside the content
 * */

export function usePropsForModalWithInitializer(initialObjectInitializer) {
    const [tempObject, setTempObject] = useState();
    const firstInputRefElement = useRef(null);

    const onChange = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = e.target.value;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    const onChangeNumber = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = parseInt(e.target.value) || null;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    const onChangeSelect = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        const selectedOptions = Array.from(e.target.options).filter(o => o.selected).map(o => o.value);
        newTempObject[fieldName] = selectedOptions;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    return {
        tempObject,
        setTempObject,
        initialObjectInitializer,
        firstInputRefElement,
        onChange,
        onChangeNumber,
        onChangeSelect
    };
}

export function usePropsForModalWithInitialObject(initialObject) {
    const [tempObject, setTempObject] = useState(initialObject);
    const firstInputRefElement = useRef(null);

    const onChange = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = e.target.value;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    const onChangeNumber = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = parseInt(e.target.value) || null;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    const onChangeSelect = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        const selectedOptions = Array.from(e.target.options).filter(o => o.selected).map(o => o.value);
        newTempObject[fieldName] = selectedOptions;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    return {tempObject, setTempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect};
}


export function ModalWithFormContent(props) {
    const {modalWithFormProps, title, isOpen, close, doSubmit, initialMessage, saveButtonText} = props;
    const {tempObject, setTempObject, initialObjectInitializer, firstInputRefElement} = modalWithFormProps;
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
            if (initialObjectInitializer) setTempObject(initialObjectInitializer());
            if (firstInputRefElement.current) firstInputRefElement.current.focus();
            clearAllMessages();
            setMessage(initialMessage);
        }
    }, [isOpen, initialObjectInitializer, setTempObject, firstInputRefElement, clearAllMessages, setMessage, initialMessage]);

    if (!isOpen) return null;

//TODO soms kapot na cancel ???

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
                <Button variant='secondary' onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">{saveButtonText || title}</Button>
            </Modal.Footer>
        </Form>
    </>;
}

export function ModalWithForm(props) {
    const {isOpen, close} = props;
    if (!isOpen) return null;
    return <Modal show={true} onHide={close}>
        <ModalWithFormContent {...props}>
            {props.children}
        </ModalWithFormContent>
    </Modal>;
}