import {useAuthenticationContext} from "../contexts/authenticationcontext";
import Nav from "react-bootstrap/Nav";
import React from "react";

export function LoginButton() {
    const {isLoggedIn, openLoginForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Nav.Link onClick={openLoginForm}>login</Nav.Link>}</>;
}

export function SignupButton() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Nav.Link onClick={openSignupForm}>signup</Nav.Link>}</>;
}

export function LogoutButton() {
    const {isLoggedIn, logout} = useAuthenticationContext();
    return <>{isLoggedIn && <Nav.Link onClick={logout}>logout</Nav.Link>}</>;
}