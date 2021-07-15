import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginLink, SignupLink} from "./authbuttons";
import {MDBInput, MDBModal, MDBModalDialog} from "mdb-react-ui-kit";
import {ModalMdbWithFormContent, usePropsForModalMdbWithInitialObject} from "./modalMdb";

function UsernameControl(props) {
    const {firstInputRefElement, onChange} = props;
    return <MDBInput className="mt-2"
                     required
                     label="username"
                     placeholder="enter username" autoComplete="username"
                     ref={firstInputRefElement}
                     onChange={e => onChange(e, "username")}/>;
}

function PasswordControl(props) {
    const {onChange} = props;
    return <MDBInput className="mt-2"
                     type="password" required
                     label="password"
                     placeholder="enter password" autoComplete="current-password"
                     onChange={e => onChange(e, "password")}/>;
}

function EmailControl(props) {
    const {onChange} = props;
    return <MDBInput className="mt-2"
                     required
                     label="email"
                     placeholder="enter email" autoComplete="email"
                     onChange={e => onChange(e, "email")}/>;
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
    const modalWithFormProps = usePropsForModalMdbWithInitialObject({username: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;

    async function doSubmit(tempObject) {
        return await authenticate(tempObject.username, tempObject.password);
    }

    return <ModalMdbWithFormContent modalWithFormProps={modalWithFormProps}
                                    title="Log in"
                                    isOpen={showLoginForm}
                                    close={close}
                                    doSubmit={doSubmit}
                                    initialMessage={SignupMessage}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
    </ModalMdbWithFormContent>;
}


export function SignupFormContent(props) {
    const {close} = props;
    const modalWithFormProps = usePropsForModalMdbWithInitialObject({username: "", email: "", password: ""});
    const {firstInputRefElement, onChange} = modalWithFormProps;
    const {showSignupForm, signup} = useAuthenticationContext();

    async function doSubmit(tempObject) {
        return await signup(tempObject.username, tempObject.email, tempObject.password);
    }

    return <ModalMdbWithFormContent modalWithFormProps={modalWithFormProps}
                                    title="Signup"
                                    isOpen={showSignupForm}
                                    close={close}
                                    doSubmit={doSubmit}
                                    initialMessage={LoginMessage}>
        <UsernameControl firstInputRefElement={firstInputRefElement} onChange={onChange}/>
        <PasswordControl onChange={onChange}/>
        <EmailControl onChange={onChange}/>
    </ModalMdbWithFormContent>;
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
    return <MDBModal show={true} onHide={close}>
        <MDBModalDialog>
            <LoginFormContent close={close}/>
            <SignupFormContent close={close}/>
        </MDBModalDialog>
    </MDBModal>;

}