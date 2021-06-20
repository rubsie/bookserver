import Button from 'react-bootstrap/Button';

/** @return {null} */
export function EditForm(props) {
    const {selectedBook, setSelectedBook, editBook, isLoggedIn} = props;

    if (!isLoggedIn) return null;
    if (!selectedBook) return null;

    return <>
        <div className="overlay" onClick={() => setSelectedBook()}/>
        <div className="modalbox modallook">
            <form onSubmit={(e) => {
                console.log("SUBMIT");
                editBook(selectedBook);
                setSelectedBook();
                e.preventDefault();
            }}>
                <div>edit the book</div>
                <div className="formrow">
                    <label>title: </label>
                    <input value={selectedBook.title} required
                           onChange={(e) => setSelectedBook({...selectedBook, title: e.target.value})}/>
                </div>
                <div className="formrow">
                    <label>author: </label>
                    <input value={selectedBook.author} required pattern="[a-zA-Z ]*" type="text"
                           onChange={(e) => setSelectedBook({...selectedBook, author: e.target.value})}/>
                </div>
                <div className="formrow">
                    <label>price (€): </label>
                    <input value={selectedBook.priceInEur || ""} type="number" min="0" max="2000"
                           onChange={(e) => setSelectedBook({
                               ...selectedBook,
                               priceInEur: parseInt(e.target.value) || null
                           })}/>
                </div>
                <div className="formbuttonrow">
                    <Button type="button" onClick={() => setSelectedBook()}>cancel</Button>
                    <Button>save</Button>
                </div>
            </form>
        </div>
    </>;
}