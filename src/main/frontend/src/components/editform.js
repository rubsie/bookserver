import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Message} from "./message";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";

/** @return {null} */
export function EditForm(props) {
    const {showEditFormForBook, setShowEditFormForBook} = props;
    const [bookCopyForEdit, setBookCopyForEdit] = useState();
    const {isLoggedIn} = useAuthenticationContext();
    const {editBook} = useBooksContext();

    const close = () => setShowEditFormForBook();

    //use submit event so that client-side-validations are processed
    function handleSubmit(e) {
        console.log("SUBMIT");
        console.log({bookCopyForEdit});
        editBook(bookCopyForEdit);
        close();
        e.preventDefault();
    }

    //if showEditFormForBook changes we copy it into the state bookCopyForEdit
    useEffect(() => {
        console.log(`useEffect EditForm`);
        console.log({showEditFormForBook});
        setBookCopyForEdit(showEditFormForBook ? {...showEditFormForBook} : undefined);
    }, [showEditFormForBook, setBookCopyForEdit]);

    if (!isLoggedIn || !bookCopyForEdit) return null;
    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Edit the book</Modal.Title>
        </Modal.Header>
        <Message/>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>title: </Form.Label>
                    <Form.Control required value={bookCopyForEdit.title}
                                  onChange={(e) => setBookCopyForEdit({...bookCopyForEdit, title: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>author: </Form.Label>
                    <Form.Control required value={bookCopyForEdit.author}
                                  onChange={(e) => setBookCopyForEdit({...bookCopyForEdit, author: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>price (€): </Form.Label>
                    <Form.Control value={bookCopyForEdit.priceInEur} type="number" min="0" max="2000"
                                  onChange={(e) => setBookCopyForEdit({
                                      ...bookCopyForEdit,
                                      priceInEur: parseInt(e.target.value) || null
                                  })}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">save</Button>
            </Modal.Footer>
        </Form>
    </Modal>;
}