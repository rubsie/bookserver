import React, {useCallback} from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {useAuthorsContext} from "../contexts/authorscontext";
import {ModalMdbWithForm, usePropsForModalMdbWithInitializer} from "./modalMdb";
import {MDBInput} from "mdb-react-ui-kit";
import {MySelectMultiple} from "./select";


//bookShownInEditForm is the book object that is selected to show. If not defined the edit-form is not open.
export function EditForm(props) {
    const {bookShownInEditForm, setBookShownInEditForm} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const {editBook, editAuthorsForBook} = useBooksContext();
    const objectInitialValue = useCallback(() => {
        return {
            title: bookShownInEditForm.title,
            authors: bookShownInEditForm.authors.map(a => a.id),
            priceInEur: bookShownInEditForm.priceInEur
        };
    }, [bookShownInEditForm]);
    const modalWithFormProps = usePropsForModalMdbWithInitializer(objectInitialValue);
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {authors} = useAuthorsContext()
    const close = () => setBookShownInEditForm();

    async function doSubmit(tempObject) {
        const oldAuthorIds = bookShownInEditForm.authors.map(a => a.id);
        const newAuthorIds = tempObject.authors;
        const authorsChanged = oldAuthorIds.length !== newAuthorIds.length ||
            oldAuthorIds.some(oldAuthorId => !newAuthorIds.includes(oldAuthorId));
        console.log(`doSubmit`, {tempObject, authorsChanged, oldAuthorIds, newAuthorIds});
        //first we modify the authors - so that in the next step savedBook will contain the modified authors
        let savedBook = await editBook({
            id: bookShownInEditForm.id,
            title: tempObject.title,
            priceInEur: tempObject.priceInEur
        });
        if (authorsChanged) savedBook = await editAuthorsForBook(bookShownInEditForm, newAuthorIds.map(id => ({id})));
        return savedBook;
    }

    /* TODO edit book with new author  */
    return <ModalMdbWithForm modalWithFormProps={modalWithFormProps}
                             title="Edit the book"
                             isOpen={isLoggedIn && bookShownInEditForm}
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