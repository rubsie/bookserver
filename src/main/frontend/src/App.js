import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState} from "react";
import {Booksnavbar} from "./components/booksnavbar";
import {CreateForm} from "./components/createform";
import {EditForm} from "./components/editform";
import {BookList} from "./components/booklist";
import {Message} from "./components/message";
import {MessageProvider} from "./contexts/messagecontext";
import {AuthenticationProvider} from "./contexts/authenticationcontext";
import {BooksProvider} from "./contexts/bookscontext";
import {FetchProvider} from "./contexts/fetchcontext";
import {IconContext} from "react-icons";
import {LoginSignupForm} from "./components/loginsignupform";
import {AuthorsProvider} from "./contexts/authorscontext";

function ProvidedApp() {
    const [bookShownInEditForm, setBookShownInEditForm] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);

    console.log("render App()");

    return (
        <div className="App">
            <Booksnavbar setShowCreateForm={setShowCreateForm}/>
            <Message/>
            <BookList setShowEditFormForBook={setBookShownInEditForm}/>
            <EditForm bookShownInEditForm={bookShownInEditForm} setBookShownInEditForm={setBookShownInEditForm}/>
            <CreateForm show={showCreateForm} close={() => setShowCreateForm(false)}/>
            <LoginSignupForm/>
        </div>
    );
}

function App() {
    return <IconContext.Provider value={{className: "icons-global-class-name"}}>
        <MessageProvider>
            <FetchProvider>
                <AuthorsProvider>
                    <BooksProvider>
                        <AuthenticationProvider>
                            <ProvidedApp/>
                        </AuthenticationProvider>
                    </BooksProvider>
                </AuthorsProvider>
            </FetchProvider>
        </MessageProvider>
    </IconContext.Provider>;

}

export default App;
