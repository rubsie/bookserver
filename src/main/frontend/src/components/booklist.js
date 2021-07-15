import React from "react";
import {Book} from "./book";
import {MdAdd, MdRefresh} from 'react-icons/md';
import {useBooksContext} from "../contexts/bookscontext";
import {MDBBtn, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import {IfLoggedIn} from "./ifLoggedIn";

export function BookList(props) {
    const {setShowEditFormForBook, setShowCreateForm} = props;
    const {books, getBooks} = useBooksContext();

    return <>
        <MDBBtn variant="light" onClick={getBooks}><MdRefresh color="inherit"/></MDBBtn>
        <IfLoggedIn>
            <MDBBtn onClick={() => setShowCreateForm(true)}><MdAdd color="inherit"/></MDBBtn>
        </IfLoggedIn>
        <MDBContainer fluid>
            <MDBRow>
                {books.map(b =>
                    <Book key={b.title} book={b} setShowEditFormForBook={setShowEditFormForBook}/>)}

            </MDBRow>
        </MDBContainer>
    </>
}