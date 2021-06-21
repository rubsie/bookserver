import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Message} from "./message";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";

/** @return {null} */
export function EditForm(props) {
    const {showEditFormForBook, setShowEditFormForBook} = props;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [priceInEur, setPriceInEur] = useState("");
    const {isLoggedIn} = useAuthenticationContext();
    const {editBook} = useBooksContext();
    const close = () => setShowEditFormForBook();
    const firstInputRefElement = useRef(null);

    //use submit event so that client-side-validations are processed
    function handleSubmit(e) {
        console.log("SUBMIT");
        editBook({id: showEditFormForBook.id, title, author, priceInEur});
        close();
        e.preventDefault();
    }

    //if showEditFormForBook changes we copy it into the states we use to manage the input fields
    useEffect(() => {
        console.log(`useEffect EditForm`);
        console.log({showEditFormForBook});
        if (showEditFormForBook) {
            setTitle(showEditFormForBook.title);
            setAuthor(showEditFormForBook.author);
            setPriceInEur(showEditFormForBook.priceInEur);
        }
        //put focus on first input element when the form becomes visible
        if (showEditFormForBook && firstInputRefElement.current) {
            firstInputRefElement.current.focus();
        }
    }, [showEditFormForBook]);


    if (!isLoggedIn || !showEditFormForBook) return null;
    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Edit the book</Modal.Title>
        </Modal.Header>
        <Message/>
        <Form onSubmit={e => handleSubmit(e)}>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>title: </Form.Label>
                    <Form.Control required value={title}
                                  ref={firstInputRefElement}
                                  onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>author: </Form.Label>
                    <Form.Control required value={author}
                                  onChange={e => setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>price (€): </Form.Label>
                    <Form.Control value={priceInEur} type="number" min="0" max="2000"
                                  onChange={e => setPriceInEur(parseInt(e.target.value) || null)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">save</Button>
            </Modal.Footer>
        </Form>
    </Modal>;
}