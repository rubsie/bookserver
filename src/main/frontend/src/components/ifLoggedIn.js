import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";

/** children are only visible if user is logged in  */
/** @return {null} */
export function IfLoggedIn(props) {
    const {children} = props;
    const {isLoggedIn} = useAuthenticationContext();
    if (!isLoggedIn) return null;
    return <>{children}</>;
}