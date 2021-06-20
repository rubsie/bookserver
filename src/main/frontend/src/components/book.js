import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';


export function Book(props) {
    const {book, setSelectedBook, deleteBook, isLoggedIn} = props;
    return <Row>
        <Col sm="4">{book.title}</Col>
        <Col sm="4">{book.author}</Col>
        <Col sm="2">{book.priceInEur}{book.priceInEur && " €"}</Col>
        {isLoggedIn && <>
            <Col sm="1"><Button variant="light"
                         onClick={() => setSelectedBook(book)}><MdEdit/></Button>
            </Col>
            <Col sm="1"><Button variant="light"
                          onClick={() => deleteBook(book)}><MdDelete/></Button>
            </Col>
        </>}
    </Row>
}