import {Book} from "./book";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export function BookList(props) {
    const {books, isLoggedIn, setSelectedBook, deleteBook, getBooks} = props;
    return <>
        <Container>{books.map((b) =>
            <Book key={b.title} book={b}
                  isLoggedIn={isLoggedIn}
                  setSelectedBook={setSelectedBook}
                  deleteBook={deleteBook}/>)}
        </Container>
        <Button onClick={getBooks}>refresh</Button>
    </>
}