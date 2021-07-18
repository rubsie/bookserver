import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {useAuthorsContext} from "../contexts/authorscontext";
import {ModalMdbWithForm, usePropsForModalMdbWithInitialObject} from "./modalMdb";
import {MDBInput} from "mdb-react-ui-kit";
import {MySelectMultiple} from "./select";

export function CreateForm(props) {
    const {show, close} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const modalWithFormProps = usePropsForModalMdbWithInitialObject({title: "", authors: [], priceInEur: ""});
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {createBook, editAuthorsForBook} = useBooksContext();
    const {authors} = useAuthorsContext()

    async function doSubmit(tempObject) {
        console.log(`doSubmit`, {tempObject});
        const authorIds = tempObject.authors.map(id => ({id}));
        //first we modify the authors - so that in the next step savedBook will contain the modified authors
        let savedBook = await createBook({
            title: tempObject.title,
            priceInEur: tempObject.priceInEur
        });
        const bookSavedWithAuthors = await editAuthorsForBook(savedBook, authorIds);
        return bookSavedWithAuthors;
    }

    console.log(`CreateForm`, {tempObject});
    /* TODO create book with new author  */
    return <ModalMdbWithForm modalWithFormProps={modalWithFormProps}
                             title="New book"
                             isOpen={isLoggedIn && show}
                             close={close}
                             doSubmit={doSubmit}
                             saveButtonText={"save"}>

        <MDBInput className="mt-2" label="title" required value={tempObject && tempObject.title}
                  ref={firstInputRefElement}
                  onChange={e => onChange(e, "title")}/>

        <MySelectMultiple value={tempObject && tempObject.authors}
                          onChange={e => onChangeSelect(e, "authors")}>
            {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </MySelectMultiple>
        <MDBInput className="mt-2" label="price (€)" type="number" min="0" max="2000"
                  value={tempObject ? String(tempObject.priceInEur) : ""}
                  onChange={e => onChangeNumber(e, "priceInEur")}/>

    </ModalMdbWithForm>;
}