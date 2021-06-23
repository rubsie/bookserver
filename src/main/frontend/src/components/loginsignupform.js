import React, {useCallback, useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {Message} from "./message";
import {LoginLink, SignupLink} from "./authbuttons";
import {useMessageContext} from "../contexts/messagecontext";

function ModalWithForm(props) {
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

//the new one
function LoginFormContent(props) {
    const {close} = props;
    const modalWithFormProps = useModalWithFormProps({username: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;
    const {showLoginBox, authenticate} = useAuthenticationContext();

    async function doSubmit(tempObject) {
        return await authenticate(tempObject.username, tempObject.password);
    }

    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="Log in"
                          isOpen={showLoginBox}
                          close={close}
                          doSubmit={doSubmit}
                          initialMessage={<>You don't have an account? Then <SignupLink/>.</>}>
        <Form.Group controlId="username">
            <Form.Label>username: </Form.Label>
            <Form.Control required placeholder="Enter username" autoComplete="username"
                          ref={firstInputRefElement}
                          onChange={e => onChange(e, "username")}/>

        </Form.Group>
        <Form.Group controlId="password">
            <Form.Label>password: </Form.Label>
            <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                          onChange={e => onChange(e, "password")}/>
        </Form.Group>
    </ModalWithForm>;
}

function LoginFormContentOrig(props) {
    const {close} = props;
    const [tempObject, setTempObject] = useState({username: "", password: ""});
    const {showLoginBox, authenticate} = useAuthenticationContext();
    const {setMessage, clearAllMessages} = useMessageContext();
    const firstInputRefElement = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("SUBMIT Login");
        const result = await authenticate(tempObject.username, tempObject.password);
        if (result) close()
        else firstInputRefElement.current.focus();
    }

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (showLoginBox) {
            if (firstInputRefElement.current) firstInputRefElement.current.focus();
            clearAllMessages();
            setMessage(<>You don't have an account? Then <SignupLink/>.</>);
        }
    }, [showLoginBox]);
    if (!showLoginBox) return null;

    return <>
        <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Form onSubmit={e => handleSubmit(e)}>
            <Modal.Body>
                <Message/>
                <Form.Group controlId="username">
                    <Form.Label>username: </Form.Label>
                    <Form.Control required placeholder="Enter username" autoComplete="username"
                                  ref={firstInputRefElement}
                                  onChange={e => setTempObject({...tempObject, username: e.target.value})}/>

                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password: </Form.Label>
                    <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                                  onChange={e => setTempObject({...tempObject, password: e.target.value})}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">login</Button>
            </Modal.Footer>
        </Form></>;

}

export function SignupFormContent(props) {
    const {close} = props;
    const [tempObject, setTempObject] = useState({username: "", email: "", password: ""});
    const {showSignupBox, signup} = useAuthenticationContext();
    const {setMessage, clearAllMessages} = useMessageContext();
    const firstInputRefElement = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("SUBMIT signup");
        const result = await signup(tempObject.username, tempObject.email, tempObject.password);
        if (result) close()
        else firstInputRefElement.current.focus();
    }

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (showSignupBox) {
            if (firstInputRefElement.current) firstInputRefElement.current.focus();
            clearAllMessages();
            setMessage(<>You already have an account? Then <LoginLink/>.</>);
        }
    }, [showSignupBox]);

    if (!showSignupBox) return null;
    return <>
        <Modal.Header closeButton>
            <Modal.Title>Sign up as a new user</Modal.Title>
        </Modal.Header>
        <Form onSubmit={e => handleSubmit(e)}>
            <Modal.Body>
                <Message/>
                <Form.Group controlId="username">
                    <Form.Label>username: </Form.Label>
                    <Form.Control required placeholder="Enter username" autoComplete="username"
                                  ref={firstInputRefElement}
                                  onChange={e => setTempObject({...tempObject, username: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>email: </Form.Label>
                    <Form.Control required placeholder="Enter email" autoComplete="email"
                                  onChange={e => setTempObject({...tempObject, email: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password: </Form.Label>
                    <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                                  onChange={e => setTempObject({...tempObject, password: e.target.value})}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">signup</Button>
            </Modal.Footer>
        </Form>
    </>;

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