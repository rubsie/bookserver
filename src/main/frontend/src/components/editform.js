import React, {useCallback} from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitializer} from "./modal";

//bookShownInEditForm is the book object that is selected to show. If not defined the edit-form is not open.
export function EditForm(props) {
    const {bookShownInEditForm, setBookShownInEditForm} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const {editBook} = useBooksContext();
    const objectInitialValue = useCallback(() => {
        return {
            title: bookShownInEditForm.title,
            author: bookShownInEditForm.author,
            priceInEur: bookShownInEditForm.priceInEur
        };
    }, [bookShownInEditForm]);
    const modalWithFormProps = usePropsForModalWithInitializer(objectInitialValue);
    const {tempObject, firstInputRefElement, onChange, onChangeNumber} = modalWithFormProps;
    const close = () => setBookShownInEditForm();

    async function doSubmit(tempObject) {
        return await editBook({
            id: bookShownInEditForm.id,
            title: tempObject.title,
            author: tempObject.author,
            priceInEur: tempObject.priceInEur
        });
    }

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
        <Form.Group controlId="author">
            <Form.Label>author: </Form.Label>
            <Form.Control required value={tempObject && tempObject.author}
                          onChange={e => onChange(e, "author")}/>
        </Form.Group>
        <Form.Group controlId="price">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}