import {useAuthenticationContext} from "../contexts/authenticationcontext";
import React from "react";
import {IfLoggedIn, IfNotLoggedIn} from "./ifLoggedIn";
import {Alert, Nav} from "react-bootstrap";

export function LoginNavLink() {
    const {openLoginForm} = useAuthenticationContext();
    return <IfNotLoggedIn>
        <Nav.Item>
            <Nav.Link onClick={openLoginForm}>login</Nav.Link>
        </Nav.Item>
    </IfNotLoggedIn>;
}

export function LoginLink() {
    const {openLoginForm} = useAuthenticationContext();
    return <IfNotLoggedIn>
        <Alert.Link onClick={openLoginForm}>login</Alert.Link>
    </IfNotLoggedIn>;
}

export function SignupNavLink() {
    const {openSignupForm} = useAuthenticationContext();
    return <IfNotLoggedIn>
        <Nav.Item>
            <Nav.Link onClick={openSignupForm}>signup</Nav.Link>
        </Nav.Item>
    </IfNotLoggedIn>;
}

export function SignupLink() {
    const {openSignupForm} = useAuthenticationContext();
    return <IfNotLoggedIn>
        <Alert.Link onClick={openSignupForm}>signup</Alert.Link>
    </IfNotLoggedIn>;
}

export function LogoutNavLink() {
    const {logout} = useAuthenticationContext();
    return <IfLoggedIn>
        <Nav.Item>
            <Nav.Link onClick={logout}>logout</Nav.Link>
        </Nav.Item>
    </IfLoggedIn>;
}