import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {Message} from "./message";
import {LoginLink, SignupLink} from "./authbuttons";
import {useMessageContext} from "../contexts/messagecontext";

function LoginFormContent(props) {
    const {close} = props;
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const {showLoginBox, authenticate} = useAuthenticationContext();
    const {setMessage, clearAllMessages} = useMessageContext();
    const firstInputRefElement = useRef(null);

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
        <Form onSubmit={(e) => e.preventDefault()}>
            <Modal.Body>
                <Message/>
                <Form.Group controlId="username">
                    <Form.Label>username: </Form.Label>
                    <Form.Control required placeholder="Enter username" autoComplete="username"
                                  ref={firstInputRefElement}
                                  onChange={e => setLoginUsername(e.target.value)}/>

                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password: </Form.Label>
                    <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                                  onChange={(e) => setLoginPassword(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>cancel</Button>
                <Button variant="primary" onClick={() => authenticate(loginUsername, loginPassword)}>login</Button>
            </Modal.Footer>
        </Form></>;

}

export function SignupFormContent(props) {
    const {close} = props;
    const [signupUsername, setSignupUsername] = useState();
    const [signupEmail, setSignupEmail] = useState();
    const [signupPassword, setSignupPassword] = useState();
    const {showSignupBox, signup} = useAuthenticationContext();
    const {setMessage, clearAllMessages} = useMessageContext();
    const firstInputRefElement = useRef(null);

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
        <Form onSubmit={(e) => e.preventDefault()}>
            <Modal.Body>
                <Message/>
                <Form.Group controlId="username">
                    <Form.Label>username: </Form.Label>
                    <Form.Control required placeholder="Enter username" autoComplete="username"
                                  ref={firstInputRefElement}
                                  onChange={e => setSignupUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>email: </Form.Label>
                    <Form.Control required placeholder="Enter email" autoComplete="email"
                                  onChange={e => setSignupEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>password: </Form.Label>
                    <Form.Control type="password" required placeholder="Password" autoComplete="current-password"
                                  onChange={(e) => setSignupPassword(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>cancel</Button>
                <Button variant="primary"
                        onClick={() => signup(signupUsername, signupEmail, signupPassword)}>signup</Button>
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