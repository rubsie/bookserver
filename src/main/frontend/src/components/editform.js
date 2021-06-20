import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Message} from "./message";

/** @return {null} */
export function EditForm(props) {
    const {selectedBook, setSelectedBook, editBook, isLoggedIn, message, setMessage} = props;
    if (!isLoggedIn || !selectedBook) return null;

    function close() {
        setSelectedBook()
    }

    function handleSubmit(e) {
        console.log("SUBMIT");
        editBook(selectedBook);
        setSelectedBook();
        e.preventDefault();
    }

    return <Modal show={true} onHide={close}>
        <Modal.Header closeButton>
            <Modal.Title>Edit the book</Modal.Title>
        </Modal.Header>
        <Message  />
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>title: </Form.Label>
                    <Form.Control required value={selectedBook.title}
                                  onChange={(e) => setSelectedBook({...selectedBook, title: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>author: </Form.Label>
                    <Form.Control required value={selectedBook.author}
                                  onChange={(e) => setSelectedBook({...selectedBook, author: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>price (€): </Form.Label>
                    <Form.Control value={selectedBook.priceInEur} type="number" min="0" max="2000"
                                  onChange={(e) => setSelectedBook({
                                      ...selectedBook,
                                      apriceInEur: parseInt(e.target.value) || null
                                  })}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={() => setSelectedBook()}>cancel</Button>
                <Button variant="primary" type="submit">save</Button>
            </Modal.Footer>
        </Form>
    </Modal>;
}