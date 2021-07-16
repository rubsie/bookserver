import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginNavLink, LogoutNavLink} from "./authbuttons";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarNav} from 'mdb-react-ui-kit';

/** * @return {null} */
export function Booksnavbar() {
    const {username} = useAuthenticationContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <MDBNavbar dark bgColor='dark' sticky="top" className='p-2'>
        <MDBNavbarBrand>{userInfo}</MDBNavbarBrand>
        <MDBNavbarNav right fullWidth={false}>
            <MDBNavbarItem><LoginNavLink/></MDBNavbarItem>
            <MDBNavbarItem><LogoutNavLink/></MDBNavbarItem>
        </MDBNavbarNav>
    </MDBNavbar>;
}
