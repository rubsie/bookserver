import React from "react";
import {Book} from "./book";
import {useBooksContext} from "../contexts/bookscontext";
import {MDBContainer, MDBRow} from "mdb-react-ui-kit";

export function BookList(props) {
    const {setShowEditFormForBook} = props;
    const {books} = useBooksContext();

    return <>
        <MDBContainer fluid>
            <MDBRow>
                {books.map(b =>
                    <Book key={b.title} book={b} setShowEditFormForBook={setShowEditFormForBook}/>)}
            </MDBRow>
        </MDBContainer>
    </>
}