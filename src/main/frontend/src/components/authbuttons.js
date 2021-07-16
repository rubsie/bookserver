import {useAuthenticationContext} from "../contexts/authenticationcontext";
import React from "react";
import {MDBCardLink, MDBNavbarLink} from "mdb-react-ui-kit";
import {IfLoggedIn, IfNotLoggedIn} from "./ifLoggedIn";

export function LoginNavLink() {
    const {openLoginForm} = useAuthenticationContext();
    return <IfNotLoggedIn><MDBNavbarLink onClick={openLoginForm}>login</MDBNavbarLink>}</IfNotLoggedIn>;
}

export function LoginLink() {
    const {openLoginForm} = useAuthenticationContext();
    return <IfNotLoggedIn><MDBCardLink onClick={openLoginForm}>login</MDBCardLink></IfNotLoggedIn>;
}

export function SignupNavLink() {
    const {openSignupForm} = useAuthenticationContext();
    return <IfNotLoggedIn><MDBNavbarLink onClick={openSignupForm}>signup</MDBNavbarLink></IfNotLoggedIn>;
}

export function SignupLink() {
    const {isLoggedIn, openSignupForm} = useAuthenticationContext();
    return <IfNotLoggedIn> <MDBCardLink onClick={openSignupForm}>signup</MDBCardLink></IfNotLoggedIn>;
}

export function LogoutNavLink() {
    const {logout} = useAuthenticationContext();
    return <IfLoggedIn><MDBNavbarLink onClick={logout}>logout</MDBNavbarLink></IfLoggedIn>;
}