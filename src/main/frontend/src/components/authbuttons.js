import {useAuthenticationContext} from "../contexts/authenticationcontext";
import React from "react";
import {MDBCardLink} from "mdb-react-ui-kit";
import {IfLoggedIn, IfNotLoggedIn} from "./ifLoggedIn";
import {Nav} from "react-bootstrap";

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
        <MDBCardLink onClick={openLoginForm}>login</MDBCardLink>
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
    return <IfNotLoggedIn> <MDBCardLink onClick={openSignupForm}>signup</MDBCardLink></IfNotLoggedIn>;
}

export function LogoutNavLink() {
    const {logout} = useAuthenticationContext();
    return <IfLoggedIn>
        <Nav.Item>
            <Nav.Link onClick={logout}>logout</Nav.Link>
        </Nav.Item>
    </IfLoggedIn>;
}