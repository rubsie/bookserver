import React from "react";
import {MdAdd, MdRefresh} from "react-icons/md";
import {useBooksContext} from "../contexts/bookscontext";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

/** * @return {null} */
export function Booksnavbar(props) {
    const {setShowCreateForm} = props;
    const {getBooks} = useBooksContext();

    return <>
        <Navbar fixed="top" bg="dark" variant="dark" className="shadow p-2">
            <Container>
                <Nav>
                    <Button className="m-1" size='sm' color="light"
                            onClick={getBooks}>
                        <MdRefresh color="inherit"/></Button>
                    <Button className="m-1" size='sm' color="light"
                            onClick={() => setShowCreateForm(true)}>
                        <MdAdd color="inherit"/></Button>
                </Nav>
            </Container>
        </Navbar>
        <div style={{height: "3.5em"}}/>
    </>;
}
