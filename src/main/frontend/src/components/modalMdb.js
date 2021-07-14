import React, {useCallback, useEffect, useRef, useState} from "react";
import {useMessageContext} from "../contexts/messagecontext";
import {Message} from "./message";
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";

/** Usage:
 * Component ModalWithForm creates a modal that will be open if prop isOpen is truthy.
 * Content of the Modal is predefined in Component ModalWithFormContent.
 * You can also use ModalWithFormContent directly (if you want to define the modal yourself).
 * You need to  use the context usePropsForModalWithInitializer or usePropsForModalWithInitialObject
 * -- it initializes everything the ModalWithFormContent needs and that you want to use inside the content
 * */

export function usePropsForModalMdbWithInitializer(initialObjectInitializer) {
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

export function usePropsForModalMdbWithInitialObject(initialObject) {
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


export function ModalMdbWithFormContent(props) {
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

//TODO closeButton
//TODO soms kapot na cancel ???

    return <MDBModalContent>
        <MDBModalHeader closeButton>
            <MDBModalTitle>{title}</MDBModalTitle>
        </MDBModalHeader>
        <form onSubmit={e => handleSubmit(e)}>
            <MDBModalBody>
                <Message/>
                {props.children}
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='secondary' onClick={close}>cancel</MDBBtn>
                <MDBBtn type="submit">{saveButtonText || title}</MDBBtn>
            </MDBModalFooter>
        </form>
    </MDBModalContent>;
}

export function ModalMdbWithForm(props) {
    const {isOpen, close} = props;
    if (!isOpen) return null;
    return <MDBModal show={true} onHide={close}>
        <MDBModalDialog>
            <ModalMdbWithFormContent {...props}>
                {props.children}
            </ModalMdbWithFormContent>
        </MDBModalDialog> </MDBModal>;
}