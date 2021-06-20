import {Book} from "./book";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { MdAdd } from 'react-icons/md';
import { MdRefresh } from 'react-icons/md';

export function BookList(props) {
    const {books, isLoggedIn, setSelectedBook, setShowCreateForm, deleteBook, getBooks} = props;
    return <>
        <Container className="m-5">{books.map((b) =>
            <Book key={b.title} book={b}
                  isLoggedIn={isLoggedIn}
                  setSelectedBook={setSelectedBook}
                  deleteBook={deleteBook}/>)}
        </Container>
        <ButtonGroup>
            <Button variant="light" onClick={getBooks}><MdRefresh/></Button>
            {isLoggedIn && <Button variant="light" onClick={() => setShowCreateForm(true)}><MdAdd/></Button>}
        </ButtonGroup>
    </>
}