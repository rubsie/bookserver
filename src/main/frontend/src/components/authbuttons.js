import {useAuthenticationContext} from "../contexts/authenticationcontext";
import React from "react";
import Alert from "react-bootstrap/Alert";
import {MDBNavbarLink} from "mdb-react-ui-kit";

export function LoginNavLink() {
    const {isLoggedIn, openLoginForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <MDBNavbarLink onClick={openLoginForm}>login</MDBNavbarLink>}</>;
}

export function LoginLink() {
    const {isLoggedIn, openLoginForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Alert.Link onClick={openLoginForm}>login</Alert.Link>}</>;
}

export function SignupNavLink() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <MDBNavbarLink onClick={openSignupForm}>signup</MDBNavbarLink>}</>;
}

export function SignupLink() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <>{!isLoggedIn && <Alert.Link onClick={openSignupForm}>signup</Alert.Link>}</>;
}

export function LogoutNavLink() {
    const {isLoggedIn, logout} = useAuthenticationContext();
    return <>{isLoggedIn && <MDBNavbarLink onClick={logout}>logout</MDBNavbarLink>}</>;
}