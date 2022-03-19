import React from "react";
import {Book} from "./book";
import {useBooksContext} from "../contexts/bookscontext";
import {Container, Row} from "react-bootstrap";
import {Search} from "./searchform";


export function BookList(props) {
    const {setShowEditFormForBook} = props;
    const {books} = useBooksContext();

    return <>
        <Container fluid>
            <Search/>
            <Row>
                {books.map(b =>
                    <Book key={b.title} book={b} setShowEditFormForBook={setShowEditFormForBook}/>)}
            </Row>
        </Container>
    </>
}