import {useAuthenticationContext} from "../contexts/authenticationcontext";
import Nav from "react-bootstrap/Nav";
import React from "react";
import Alert from "react-bootstrap/Alert";

export function LoginNavLink() {
    const {isLoggedIn, openLoginForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Nav.Link onClick={openLoginForm}>login</Nav.Link>}</>;
}

export function LoginLink() {
    const {isLoggedIn, openLoginForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Alert.Link onClick={openLoginForm}>login</Alert.Link>}</>;
}

export function SignupNavLink() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Nav.Link onClick={openSignupForm}>signup</Nav.Link>}</>;
}

export function SignupLink() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Alert.Link onClick={openSignupForm}>signup</Alert.Link>}</>;
}

export function LogoutNavLink() {
    const {isLoggedIn, logout} = useAuthenticationContext();
    return <>{isLoggedIn && <Nav.Link onClick={logout}>logout</Nav.Link>}</>;
}