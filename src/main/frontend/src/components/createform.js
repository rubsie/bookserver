import React, {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Message} from "./message";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";

/** @return {null} */
export function CreateForm(props) {
    const {show, close} = props;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [priceInEur, setPriceInEur] = useState("");
    const {isLoggedIn} = useAuthenticationContext();
    const {createBook} = useBooksContext();
    const firstInputRefElement = useRef(null);

    useEffect(() => {
        //put focus on first input element when the form becomes visible
        if (show && firstInputRefElement.current) {
            firstInputRefElement.current.focus();
        }
    }, [show]);

    function handleSubmit(e) {
        console.log("SUBMIT");
        createBook({title, author, priceInEur});
        setTitle("");
        setAuthor("");
        setPriceInEur("");
        e.preventDefault();
    }

    if (!isLoggedIn || !show) return null;
    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>New book</Modal.Title>
        </Modal.Header>
        <Message/>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>title: </Form.Label>
                    <Form.Control required value={title}
                                  ref={firstInputRefElement}
                                  onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>author: </Form.Label>
                    <Form.Control required value={author}
                                  onChange={(e) => setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>price (€): </Form.Label>
                    <Form.Control value={priceInEur} type="number" min="0" max="2000"
                                  onChange={(e) => setPriceInEur(parseInt(e.target.value) || null)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={close}>cancel</Button>
                <Button variant="primary" type="submit">create</Button>
            </Modal.Footer>
        </Form>
    </Modal>;

}