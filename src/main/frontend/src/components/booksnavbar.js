import React from "react";
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginButton, LogoutButton} from "./authbuttons";

/** * @return {null} */
export function Booksnavbar() {
    const {username} = useAuthenticationContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <NavBar bg="dark" variant="dark" sticky="top" className="justify-content-between">
        <NavBar.Brand>{userInfo}</NavBar.Brand>
        <Nav className="justify-content-end">
            <Nav.Item><LoginButton/></Nav.Item>
            <Nav.Item><LogoutButton/></Nav.Item>
        </Nav>
    </NavBar>;
}