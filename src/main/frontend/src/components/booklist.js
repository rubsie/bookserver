import React from "react";
import {Book} from "./book";
import {MdAdd, MdRefresh} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";
import {useBooksContext} from "../contexts/bookscontext";
import {MDBBtn, MDBBtnGroup, MDBContainer, MDBRow} from "mdb-react-ui-kit";

export function BookList(props) {
    const {setShowEditFormForBook, setShowCreateForm} = props;
    const {books, getBooks} = useBooksContext();

    return <>
        <MDBBtnGroup className="m-3">
            <MDBBtn variant="light" onClick={getBooks}><MdRefresh/></MDBBtn>
            <ButtonIfLoggedIn onClick={() => setShowCreateForm(true)}><MdAdd/></ButtonIfLoggedIn>
        </MDBBtnGroup>
        <MDBContainer fluid>
            <MDBRow>
                    {books.map(b =>
                        <Book key={b.title} book={b} setShowEditFormForBook={setShowEditFormForBook}/>)}

            </MDBRow>
        </MDBContainer>
    </>
}