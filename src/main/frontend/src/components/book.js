import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdDelete, MdEdit} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";
import {useBooksContext} from "../contexts/bookscontext";
import ButtonGroup from "react-bootstrap/ButtonGroup";


export function Book(props) {
    const {book, setShowEditFormForBook} = props;
    const {deleteBook} = useBooksContext();

    function getAuthorNames() {
        return book.authors.reduce((result, author) => result + (result && ", ") + author.authorName, "");
    }

    return <Row className="align-items-center border-bottom ">
        <Col sm="6">{book.title}</Col>
        <Col sm="3">{getAuthorNames()}</Col>
        <Col sm="1">{book.priceInEur}{book.priceInEur && " €"}</Col>
        <Col sm="2">
            <ButtonGroup>
                <ButtonIfLoggedIn onClick={() => setShowEditFormForBook(book)}><MdEdit/></ButtonIfLoggedIn>
                <ButtonIfLoggedIn onClick={() => deleteBook(book)}><MdDelete/></ButtonIfLoggedIn>
            </ButtonGroup>
        </Col>
    </Row>
}