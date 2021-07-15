import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {MDBBtn} from "mdb-react-ui-kit";

/** Button is only visible if user is logged in  */
/** @return {null} */
export function ButtonIfLoggedIn(props) {
    const {onClick, children} = props;
    const {isLoggedIn} = useAuthenticationContext();
    if (!isLoggedIn) return null;
    return <MDBBtn variant="light" onClick={onClick}>{children}</MDBBtn>;
}