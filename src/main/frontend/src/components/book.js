import React from "react";
import {MdDelete, MdEdit} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";
import {useBooksContext} from "../contexts/bookscontext";
import {MDBCard, MDBCardBody, MDBCardFooter, MDBCardText, MDBCardTitle, MDBCol} from "mdb-react-ui-kit";


export function Book(props) {
    const {book, setShowEditFormForBook} = props;
    const {deleteBook} = useBooksContext();

    //return <MDBCol size={6} sm={4} md={3} xl={2} className="mt-3">
    return <MDBCol size={6} sm={4} md={3} xl={2} className='mt-3'>
        <MDBCard className="h-100">
            <MDBCardBody>
                <MDBCardTitle>{book.title}</MDBCardTitle>
                <MDBCardText>
                    <div>{book.authors.map(a => a.authorName).join(",")}</div>
                    <div>{book.priceInEur}{book.priceInEur && " €"}</div>
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
                <ButtonIfLoggedIn onClick={() => setShowEditFormForBook(book)}><MdEdit/></ButtonIfLoggedIn>
                <ButtonIfLoggedIn onClick={() => deleteBook(book)}><MdDelete/></ButtonIfLoggedIn>
            </MDBCardFooter>
        </MDBCard>
    </MDBCol>;
}
