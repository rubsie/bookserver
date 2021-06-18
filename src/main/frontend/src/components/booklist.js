import {Book} from "./book";

export function BookList(props) {
    const {books, isLoggedIn, setSelectedBook, deleteBook, getBooks} = props;
    return <>
        <div className="booksList">{books.map((b) =>
            <Book key={b.title} book={b}
                  isLoggedIn={isLoggedIn}
                  setSelectedBook={setSelectedBook}
                  deleteBook={deleteBook}/>)}
        </div>
        <button onClick={getBooks}>refresh</button>
    </>
}