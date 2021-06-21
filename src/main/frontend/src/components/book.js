import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdDelete, MdEdit} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";
import {useBooksContext} from "../contexts/bookscontext";


export function Book(props) {
    const {book, setSelectedBook} = props;
    const {deleteBook} = useBooksContext();

    return <Row>
        <Col sm="4">{book.title}</Col>
        <Col sm="4">{book.author}</Col>
        <Col sm="2">{book.priceInEur}{book.priceInEur && " €"}</Col>
        <Col sm="1"><ButtonIfLoggedIn onClick={() => setSelectedBook(book)}><MdEdit/></ButtonIfLoggedIn> </Col>
        <Col sm="1"><ButtonIfLoggedIn onClick={() => deleteBook(book)}><MdDelete/></ButtonIfLoggedIn> </Col>
    </Row>
}