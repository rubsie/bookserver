import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Message} from "../components/message";

export function CreateForm(props) {
    const {show, close, createBook, isLoggedIn, isLoading, message, setMessage} = props;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [priceInEur, setPriceInEur] = useState("");

    if (!isLoggedIn || !show) return null;

    function handleSubmit(e) {
        console.log("SUBMIT");
        createBook({title, author, priceInEur});
        e.preventDefault();
    }
    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>New book</Modal.Title>
        </Modal.Header>
        <Message isLoading={isLoading} />
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>title: </Form.Label>
                    <Form.Control required value={title}
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