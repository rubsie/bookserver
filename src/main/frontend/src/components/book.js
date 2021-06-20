import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdEdit} from 'react-icons/md';
import {MdDelete} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";


export function Book(props) {
    const {book, setSelectedBook, deleteBook} = props;
    return <Row>
        <Col sm="4">{book.title}</Col>
        <Col sm="4">{book.author}</Col>
        <Col sm="2">{book.priceInEur}{book.priceInEur && " €"}</Col>
        <Col sm="1"><ButtonIfLoggedIn onClick={() => setSelectedBook(book)}><MdEdit/></ButtonIfLoggedIn> </Col>
        <Col sm="1"><ButtonIfLoggedIn onClick={() => deleteBook(book)}><MdDelete/></ButtonIfLoggedIn> </Col>
    </Row>
}