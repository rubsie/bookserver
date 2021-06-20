import {Book} from "./book";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {MdAdd, MdRefresh} from 'react-icons/md';
import {ButtonIfLoggedIn} from "./buttonifloggedin";

export function BookList(props) {
    const {books, setSelectedBook, setShowCreateForm, deleteBook, getBooks} = props;

    return <>
        <Container className="m-5">{books.map((b) =>
            <Book key={b.title} book={b}
                  setSelectedBook={setSelectedBook}
                  deleteBook={deleteBook}/>)}
        </Container>
        <ButtonGroup>
            <Button variant="light" onClick={getBooks}><MdRefresh/></Button>
            <ButtonIfLoggedIn onClick={() => setShowCreateForm(true)}><MdAdd/></ButtonIfLoggedIn>
        </ButtonGroup>
    </>
}