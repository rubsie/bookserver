import React from "react";
import {MdDelete, MdEdit} from 'react-icons/md';
import {useBooksContext} from "../contexts/bookscontext";
import {MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardText, MDBCardTitle, MDBCol} from "mdb-react-ui-kit";
import {IfLoggedIn} from "./ifLoggedIn";


export function Book(props) {
    const {book, setShowEditFormForBook} = props;
    const {deleteBook} = useBooksContext();

    return <MDBCol size={12} sm={6} lg={4} xl={2} className='mt-3'>
        <MDBCard className="h-100">
            <MDBCardBody>
                <MDBCardTitle>{book.title}</MDBCardTitle>
                <MDBCardText>
                    <div>{book.authors.map(a => a.authorName).join(",")}</div>
                    <div>{book.priceInEur}{book.priceInEur && " €"}</div>
                </MDBCardText>
            </MDBCardBody>
            <IfLoggedIn>
                <MDBCardFooter >
                    <MDBBtn className="m-1" size='sm' onClick={() => setShowEditFormForBook(book)}><MdEdit color="inherit"/></MDBBtn>
                    <MDBBtn className="m-1" size='sm' onClick={() => deleteBook(book)}><MdDelete color="inherit"/></MDBBtn>
                </MDBCardFooter>
            </IfLoggedIn>
        </MDBCard>
    </MDBCol>;
}
