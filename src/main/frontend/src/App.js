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
import {PapersProvider} from "./contexts/paperscontext";
import {PaperList} from "./components/paperlist";
import {CollectorsProvider} from "./contexts/collectorscontext";
import {CollectorList} from "./components/collectorslist";
import {CreateNew} from "./components/create";

function ProvidedApp() {
    const [bookShownInEditForm, setBookShownInEditForm] = useState();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showCreateNewType, setShowCreateNewType] = useState(false);

    console.log("render App()");

    return (
        <div className="App">
            <Booksnavbar setShowCreateForm={setShowCreateForm} setShowCreateNewType={setShowCreateNewType}/>
            <Message/>
            <BookList setShowEditFormForBook={setBookShownInEditForm}/>
            <EditForm bookShownInEditForm={bookShownInEditForm} setBookShownInEditForm={setBookShownInEditForm}/>
            <CreateForm show={showCreateForm} close={() => setShowCreateForm(false)}/>
            <CreateNew showCreateNewType={showCreateNewType} close={() => setShowCreateNewType(false)}/>
            <LoginSignupForm/>
            <PaperList/>
            <CollectorList/>
        </div>
    );
}

function App() {
    return <IconContext.Provider value={{className: "icons-global-class-name"}}>
        <MessageProvider>
            <FetchProvider>
                <AuthorsProvider>
                    <BooksProvider>
                        <PapersProvider>
                            <CollectorsProvider>
                                <AuthenticationProvider>
                                    <ProvidedApp/>
                                </AuthenticationProvider>
                            </CollectorsProvider>
                        </PapersProvider>
                    </BooksProvider>
                </AuthorsProvider>
            </FetchProvider>
        </MessageProvider>
    </IconContext.Provider>;
}

export default App;
