import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from "react";
import {CreateForm} from "./components/createform";
import {EditForm} from "./components/editform";
import {Booksnavbar} from "./components/booksnavbar";
import {LoginForm} from "./components/loginform";
import {BookList} from "./components/booklist";
import {Message} from "./components/message";
import {MessageProvider} from "./contexts/messagecontext";
import {AuthenticationProvider} from "./contexts/authenticationcontext";
import {BooksProvider} from "./contexts/bookscontext";

function ProvidedApp() {
    const [selectedBook, setSelectedBook] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);

    console.log("render App()");

    return (
        <div className="App">
            <Booksnavbar/>
            <Message/>
            <BookList setSelectedBook={setSelectedBook}
                      setShowCreateForm={setShowCreateForm}/>
            <CreateForm show={showCreateForm}
                        close={() => setShowCreateForm(false)}/>
            <EditForm selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
            <LoginForm/>
        </div>
    );
}

function App() {
    return <MessageProvider>
        <BooksProvider>
            <AuthenticationProvider>
                <ProvidedApp/>
            </AuthenticationProvider>
        </BooksProvider>
    </MessageProvider>;
}

export default App;
