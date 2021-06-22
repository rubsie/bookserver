import React, {useEffect, useState, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {Message} from "./message";

/** @return {null} */
export function LoginForm() {
    const [loginUsername, setLoginUsername] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const {showLoginBox, setShowLoginBox, authenticate} = useAuthenticationContext();
    const firstInputRefElement = useRef(null);
    const close = () => setShowLoginBox(false);

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (showLoginBox && firstInputRefElement.current) {
            firstInputRefElement.current.focus();
        }
    }, [showLoginBox]);

    if (!showLoginBox) return null;
    return <Modal show={true} onHide={close}>
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
        </Form>
    </Modal>;

}