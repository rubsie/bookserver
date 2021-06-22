import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {Message} from "./message";
import Alert from "react-bootstrap/Alert";
import {LoginButton} from "./authbuttons";

/** @return {null} */
export function SignupForm() {
    const [signupUsername, setSignupUsername] = useState();
    const [signupEmail, setSignupEmail] = useState();
    const [signupPassword, setSignupPassword] = useState();
    const {showSignupBox, setShowSignupBox, signup} = useAuthenticationContext();
    const firstInputRefElement = useRef(null);
    const close = () => setShowSignupBox(false);

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (showSignupBox && firstInputRefElement.current) {
            firstInputRefElement.current.focus();
        }
    }, [showSignupBox]);

    if (!showSignupBox) return null;
    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Sign up as a new user</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => e.preventDefault()}>
            <Modal.Body>
                <Message/>
                <Alert variant="dark" >
                    already an account? <LoginButton/>
                </Alert>
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
                <Button variant="primary" onClick={() => signup(signupUsername, signupEmail, signupPassword)}>signup</Button>
            </Modal.Footer>
        </Form>
    </Modal>;

}