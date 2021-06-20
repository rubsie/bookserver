import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState} from "react";
import {CreateForm} from "./components/createform";
import {EditForm} from "./components/editform";
import {LoginBanner} from "./components/loginbanner";
import {LoginForm} from "./components/loginform";
import {BookList} from "./components/booklist";
import {Message} from "./components/message";
import {MessageProvider, useMessageContext} from "./contexts/messagecontext";
import {AuthenticationProvider, useAuthenticationContext} from "./contexts/authenticationcontext";
import {fetchWithCsrf} from "./utilities/fetch";

function ProvidedApp() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const {setMessage, setIsLoading} = useMessageContext();
    const {authenticate, refreshAuthentication} = useAuthenticationContext();

    console.log("render App()");

    async function createBook(book) {
        console.log(`async createBook ${JSON.stringify(book)}`);
        setIsLoading(true);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(book)
        };
        try {
            const response = await fetchWithCsrf(`/api/books`, fetchOptions);
            const body = await response.json();
            if (response.ok) {
                console.log(`   async createBook: received response ${JSON.stringify(body)}`);
                setBooks([...books, body]);
                console.log("   async createBook: done");
                setMessage(`book ${book.title} created`);
            } else {
                console.log(`   async createBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                const errorMessage = body.errors &&
                    body.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
                console.log(`   ${JSON.stringify(body)}`);
                console.log(`   ${errorMessage}`);
                setMessage(errorMessage || body.message);
            }
        } catch (e) {
            console.log(`   async createBook: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }

    async function editBook(book) {
        if (!selectedBook) return;
        console.log("async editBook");
        setIsLoading(true);

        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(book)
        };
        try {
            const response = await fetchWithCsrf(`/api/books/${book.id}`, fetchOptions);
            const body = await response.json();
            if (response.ok) {
                console.log(`   async editBook: received response ${JSON.stringify(body)}`);
                setBooks(books.map((b) => b.id === body.id ? body : b));
                console.log("   async editBook: done");
                setMessage(`book ${book.title} modified`);
            } else {
                console.log(`   async editBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                setMessage(body.message);
            }
        } catch (e) {
            console.log(`   async deleteBook: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }

    async function deleteBook(book) {
        console.log("async deleteBook");
        setIsLoading(true);

        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
        };
        try {
            const response = await fetchWithCsrf(`/api/books/${book.id}`, fetchOptions);
            if (response.ok) {
                console.log(`   async deleteBook: received response `);
                setBooks(books.filter((b) => b.id !== book.id));
                console.log("   async deleteBook: done");
                setMessage(`book ${book.title} deleted`);
            } else {
                const body = await response.json();
                console.log(`   async deleteBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                setMessage(body.message);
            }
        } catch (e) {
            console.log(`   async deleteBook: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }

    async function getBooks() {
        console.log("   async getBooks: start");
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: 'GET',
                'credentials': 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
            };
            const response = await fetch(`/api/books`, fetchOptions);
            const body = await response.json();
            console.log(`   async getBooks: received response ${JSON.stringify(body)}`);
            setBooks(body);
            console.log("   async getBooks: done");
        } catch (e) {
            console.log(`   async getBooks: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }


    useEffect(() => {
        console.log("useEffect: start");
        getBooks();
        if (document.cookie)
            refreshAuthentication();
    }, []);

    return (
        <div className="App">
            <LoginBanner/>
            <Message/>
            <BookList books={books}
                      setSelectedBook={setSelectedBook}
                      deleteBook={deleteBook}
                      getBooks={getBooks}
                      setShowCreateForm={setShowCreateForm}/>
            <CreateForm createBook={createBook} show={showCreateForm}
                        close={() => setShowCreateForm(false)}/>
            <EditForm selectedBook={selectedBook} setSelectedBook={setSelectedBook} editBook={editBook}/>
            <LoginForm authenticate={authenticate}/>
        </div>
    );
}

function App() {
    return <MessageProvider>
        <AuthenticationProvider>
            <ProvidedApp/>
        </AuthenticationProvider>
    </MessageProvider>;
}

export default App;
