import React, {useCallback, useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {Message} from "./message";
import {LoginLink, SignupLink} from "./authbuttons";
import {useMessageContext} from "../contexts/messagecontext";

function ModalWithFormContent(props) {
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

function useModalWithFormProps(initialObject) {
    const [tempObject, setTempObject] = useState(initialObject);
    const firstInputRefElement = useRef(null);

    const onChange = useCallback((e, fieldName) => {
        const newTempObject = {...tempObject};
        newTempObject[fieldName] = e.target.value;
        setTempObject(newTempObject);
    }, [tempObject, setTempObject]);

    return {tempObject, setTempObject, firstInputRefElement, onChange};
}

function UsernameControl(props) {
    const {firstInputRefElement, onChange} = props;
    return <Form.Group controlId="username">
        <Form.Label>username: </Form.Label>
        <Form.Control required placeholder="Enter username" autoComplete="username"
                      ref={firstInputRefElement}
                      onChange={e => onChange(e, "username")}/>
    </Form.Group>;
}

function PasswordControl(props) {
    const {onChange} = props;
    return <Form.Group controlId="password">
        <Form.Label>password: </Form.Label>
        <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                      onChange={e => onChange(e, "password")}/>
    </Form.Group>;
}

function EmailControl(props) {
    const {onChange} = props;
    return <Form.Group controlId="email">
        <Form.Label>email: </Form.Label>
        <Form.Control required placeholder="Enter email" autoComplete="email"
                      onChange={e => onChange(e, "email")}/>
    </Form.Group>;
}

function LoginFormContent(props) {
    const {close} = props;
    const modalWithFormProps = useModalWithFormProps({username: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;
    const {showLoginBox, authenticate} = useAuthenticationContext();

    async function doSubmit(tempObject) {
        return await authenticate(tempObject.username, tempObject.password);
    }

    return <ModalWithFormContent modalWithFormProps={modalWithFormProps}
                          title="Log in"
                          isOpen={showLoginBox}
                          close={close}
                          doSubmit={doSubmit}
                          initialMessage={<>You don't have an account? Then <SignupLink/>.</>}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
    </ModalWithFormContent>;
}


export function SignupFormContent(props) {
    const {close} = props;
    const modalWithFormProps = useModalWithFormProps({username: "", email: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;
    const {showSignupBox, signup} = useAuthenticationContext();

    async function doSubmit(tempObject) {
        return await signup(tempObject.username, tempObject.email, tempObject.password);
    }

    return <ModalWithFormContent modalWithFormProps={modalWithFormProps}
                          title="Signup"
                          isOpen={showSignupBox}
                          close={close}
                          doSubmit={doSubmit}
                          initialMessage={<>You already have an account? Then <LoginLink/>.</>}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
        <EmailControl onChange={onChange}/>
    </ModalWithFormContent>;
}

/** @return {null} */
export function LoginSignupForm() {
    const {showLoginBox, setShowLoginBox, showSignupBox, setShowSignupBox} = useAuthenticationContext();
    const close = () => {
        setShowLoginBox(false);
        setShowSignupBox(false);
    }

    if (!showLoginBox && !showSignupBox) return null;
    return <Modal show={true} onHide={close}>
        <LoginFormContent close={close}/>
        <SignupFormContent close={close}/>
    </Modal>;

}