import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginLink, SignupLink} from "./authbuttons";
import {ModalWithFormContent, usePropsForModalWithInitialObject} from "./modal";

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

function SignupMessage() {
    return <>You don't have an account? Then <SignupLink/>.</>;
}

function LoginMessage() {
    return <>You already have an account? Then <LoginLink/>.</>;
}

function LoginFormContent(props) {
    const {close} = props;
    const {showLoginForm, authenticate} = useAuthenticationContext();
    const modalWithFormProps = usePropsForModalWithInitialObject({username: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;

    async function doSubmit(tempObject) {
        return await authenticate(tempObject.username, tempObject.password);
    }

    return <ModalWithFormContent modalWithFormProps={modalWithFormProps}
                                 title="Log in"
                                 isOpen={showLoginForm}
                                 close={close}
                                 doSubmit={doSubmit}
                                 initialMessage={SignupMessage}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
    </ModalWithFormContent>;
}


export function SignupFormContent(props) {
    const {close} = props;
    const modalWithFormProps = usePropsForModalWithInitialObject({username: "", email: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;
    const {showSignupForm, signup} = useAuthenticationContext();

    async function doSubmit(tempObject) {
        return await signup(tempObject.username, tempObject.email, tempObject.password);
    }

    return <ModalWithFormContent modalWithFormProps={modalWithFormProps}
                                 title="Signup"
                                 isOpen={showSignupForm}
                                 close={close}
                                 doSubmit={doSubmit}
                                 initialMessage={LoginMessage}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
        <EmailControl onChange={onChange}/>
    </ModalWithFormContent>;
}

//Note: Login and Signup are in 1 modal to avoid disturbing animations when the user switches between login and signup.
/** @return {null} */
export function LoginSignupForm() {
    const {showLoginForm, setShowLoginForm, showSignupForm, setShowSignupForm} = useAuthenticationContext();
    const close = () => {
        setShowLoginForm(false);
        setShowSignupForm(false);
    }

    if (!showLoginForm && !showSignupForm) return null;
    return <Modal show={true} onHide={close}>
        <LoginFormContent close={close}/>
        <SignupFormContent close={close}/>
    </Modal>;

}