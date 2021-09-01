import React from "react";
import {MdDelete, MdEdit} from 'react-icons/md';
import {useBooksContext} from "../contexts/bookscontext";
import {IfLoggedIn} from "./ifLoggedIn";
import {Button, Card, Col} from "react-bootstrap";


export function Book(props) {
    const {book, setShowEditFormForBook} = props;
    const {deleteBook} = useBooksContext();

    return <Col sx={12} sm={6} lg={4} xl={2} className='mt-3'>
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.authors.map(a => a.authorName).join(",")}</Card.Text>
                <Card.Text>{book.priceInEur}{book.priceInEur && " €"}</Card.Text>
            </Card.Body>
            <IfLoggedIn>
                <Card.Footer>
                    <Button className="m-1" size='sm'
                            onClick={() => setShowEditFormForBook(book)}><MdEdit
                        color="inherit"/></Button>
                    <Button className="m-1" size='sm'
                            onClick={() => deleteBook(book)}><MdDelete
                        color="inherit"/></Button>
                </Card.Footer>
            </IfLoggedIn>
        </Card>
    </Col>;
}
