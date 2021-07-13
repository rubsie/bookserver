import React, {useCallback} from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitializer} from "./modal";
import {useAuthorsContext} from "../contexts/authorscontext";

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
    const modalWithFormProps = usePropsForModalWithInitializer(objectInitialValue);
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {authors} = useAuthorsContext()
    const close = () => setBookShownInEditForm();

    async function doSubmit(tempObject) {
        const oldAuthorIds = bookShownInEditForm.authors.map(a => a.id);
        const newAuthorIds = tempObject.authors;
        const authorsChanged = oldAuthorIds.length !== newAuthorIds.length ||
            oldAuthorIds.some(oldAuthorId => !newAuthorIds.includes(oldAuthorId));
        console.log(`doSubmit`, {tempObject, authorsChanged, oldAuthorIds, newAuthorIds});
        if (authorsChanged) await editAuthorsForBook(bookShownInEditForm, newAuthorIds.map(id => ({id})));
        const savedBook = await editBook({
            id: bookShownInEditForm.id,
            title: tempObject.title,
            priceInEur: tempObject.priceInEur
        });
        return savedBook;
    }

    /* TODO edit book with new author  */
    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="Edit the book"
                          isOpen={isLoggedIn && bookShownInEditForm}
                          close={close}
                          doSubmit={doSubmit}
                          saveButtonText={"save"}>
        <Form.Group controlId="title">
            <Form.Label>title: </Form.Label>
            <Form.Control required value={tempObject && tempObject.title}
                          ref={firstInputRefElement}
                          onChange={e => onChange(e, "title")}/>
        </Form.Group>
        <Form.Group controlId="authorIds">
            <Form.Label>authors: </Form.Label>
            <Form.Control as="select" multiple required value={tempObject && tempObject.authors}
                          onChange={e => onChangeSelect(e, "authors")}>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}