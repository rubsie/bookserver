import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState} from "react";
import {Booksnavbar} from "./components/booksnavbar";
import {CreateForm} from "./components/createform";
import {EditForm} from "./components/editform";
import {LoginForm} from "./components/loginform";
import {BookList} from "./components/booklist";
import {Message} from "./components/message";
import {MessageProvider} from "./contexts/messagecontext";
import {AuthenticationProvider} from "./contexts/authenticationcontext";
import {BooksProvider} from "./contexts/bookscontext";
import {FetchProvider} from "./contexts/fetchcontext";

function ProvidedApp() {
    const [showEditFormForBook, setShowEditFormForBook] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);

    console.log("render App()");

    return (
        <div className="App">
            <Booksnavbar/>
            <Message/>
            <BookList setShowEditFormForBook={setShowEditFormForBook}
                      setShowCreateForm={setShowCreateForm}/>
            <EditForm showEditFormForBook={showEditFormForBook} setShowEditFormForBook={setShowEditFormForBook}/>
            <CreateForm show={showCreateForm} close={() => setShowCreateForm(false)}/>
            <LoginForm/>
        </div>
    );
}

function App() {
    return <MessageProvider>
        <FetchProvider>
            <BooksProvider>
                <AuthenticationProvider>
                    <ProvidedApp/>
                </AuthenticationProvider>
            </BooksProvider>
        </FetchProvider>
    </MessageProvider>;
}

export default App;
