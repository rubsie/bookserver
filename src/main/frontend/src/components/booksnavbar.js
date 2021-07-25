import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginNavLink, LogoutNavLink} from "./authbuttons";
import {MdAdd, MdRefresh} from "react-icons/md";
import {IfLoggedIn} from "./ifLoggedIn";
import {useBooksContext} from "../contexts/bookscontext";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

/** * @return {null} */
export function Booksnavbar(props) {
    const {setShowCreateForm} = props;
    const {username} = useAuthenticationContext();
    const {getBooks} = useBooksContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <>
        <Navbar fixed="top" bg="dark" variant="dark" className="shadow-sm">
            <Navbar.Brand>{userInfo}</Navbar.Brand>
            <Container>
                <Nav>
                    <Button className="m-1" size='sm' color="light"
                            onClick={getBooks}>
                        <MdRefresh color="inherit"/></Button>
                    <IfLoggedIn>
                        <Button className="m-1" size='sm' color="light"
                                nClick={() => setShowCreateForm(true)}>
                            <MdAdd color="inherit"/></Button>
                    </IfLoggedIn>
                </Nav>
                <Nav className="justify-content-end">
                    <Nav.Item><LoginNavLink/></Nav.Item>
                    <Nav.Item><LogoutNavLink/></Nav.Item>
                </Nav>
            </Container>
        </Navbar>
        <div style={{height: "3.5em"}}/>
    </>;
}
