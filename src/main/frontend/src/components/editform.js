import React, {useCallback} from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {useAuthorsContext} from "../contexts/authorscontext";
import {ModalWithForm, usePropsForModalWithInitializer} from "./modal";
import {Form} from "react-bootstrap";


//bookShownInEditForm is the book object that is selected to show. If not defined the edit-form is not open.
export function EditForm(props) {
    const {bookShownInEditForm, setBookShownInEditForm} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const {editBookWithAuthors} = useBooksContext();
    const objectInitialValue = useCallback(() => {
        return {
            id: bookShownInEditForm.id,
            title: bookShownInEditForm.title,
            authorIds: bookShownInEditForm.authors.map(a => a.id),
            priceInEur: bookShownInEditForm.priceInEur,
            ISBN: bookShownInEditForm.ISBN
        };
    }, [bookShownInEditForm]);
    const modalWithFormProps = usePropsForModalWithInitializer(objectInitialValue);
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {authors} = useAuthorsContext()
    const close = () => setBookShownInEditForm();

    async function doSubmit(tempObject) {
        console.log(`doSubmit`, {tempObject});
        return await editBookWithAuthors(tempObject, tempObject.authorIds);
    }

    /* TODO edit book with new author  */
    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="Edit the book"
                          isOpen={isLoggedIn && bookShownInEditForm}
                          close={close}
                          doSubmit={doSubmit}
                          saveButtonText={"save"}>
        <Form.Group controlId="title" className="mb-3">
            <Form.Label>title: </Form.Label>
            <Form.Control required value={tempObject && tempObject.title}
                          ref={firstInputRefElement}
                          onChange={e => onChange(e, "title")}/>
        </Form.Group>
        <Form.Group controlId="authorIds" className="mb-3">
            <Form.Label>authors: </Form.Label>
            <Form.Control as="select" multiple required value={tempObject && tempObject.authorIds}
                          onChange={e => onChangeSelect(e, "authorIds")}>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>

        <Form.Group controlId="ISBN" className="mb-3">
            <Form.Label>ISBN: </Form.Label>
            <Form.Control value={tempObject && tempObject.ISBN} type="text"
                          onChange={e => onChangeNumber(e, "ISBN")}/>
        </Form.Group>
    </ModalWithForm>;
}