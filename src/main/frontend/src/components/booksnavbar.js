import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginNavLink, LogoutNavLink} from "./authbuttons";
import {MdAdd, MdRefresh} from "react-icons/md";
import {IfLoggedIn} from "./ifLoggedIn";
import {useBooksContext} from "../contexts/bookscontext";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {usePapersContext} from "../contexts/paperscontext";

/** * @return {null} */
export function Booksnavbar(props) {
    const {setShowCreateForm, setShowCreateNewType} = props;
    const {username} = useAuthenticationContext();
    const {getBooks} = useBooksContext();
    const {createPaper} = usePapersContext();
    const {deletePaper} = usePapersContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <>
        <Navbar fixed="top" bg="dark" variant="dark" className="shadow p-2">
            <Navbar.Brand>{userInfo}</Navbar.Brand>
            <Container>
                <Nav>
                    <Button className="m-1" size='sm' color="light"
                            onClick={getBooks}>
                        <MdRefresh color="inherit"/></Button>
                    <IfLoggedIn>
                        <Button className="m-1" size='sm' color="light"
                                onClick={() => setShowCreateForm(true)}>
                            <MdAdd color="inherit"/></Button>
                        <Button className="m-1" size='sm' color="light"
                                onClick={() => setShowCreateNewType(true)}>
                            <MdAdd color="inherit"/>Author</Button>

                        <button onClick={()=> {
                            var naam=prompt("naam");
                            var oplage=parseInt(prompt("oplage"));
                            createPaper({naam:naam,oplage:oplage});
                        }}>Nieuwe krant</button>
                        <button onClick={()=> {
                            var id=parseInt(prompt("id"));
                            deletePaper(id);
                        }}>Verwijder krant</button>
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
