import React, {useCallback} from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitializer} from "./modal";

/** @return {null} */
export function EditForm(props) {
    const {showEditFormForBook, setShowEditFormForBook} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const {editBook} = useBooksContext();
    const objectInitialValue = useCallback(() => {
        return {
            title: showEditFormForBook.title,
            author: showEditFormForBook.author,
            priceInEur: showEditFormForBook.priceInEur
        };
    }, [showEditFormForBook]);
    const modalWithFormProps = usePropsForModalWithInitializer(objectInitialValue);
    const {tempObject, firstInputRefElement, onChange, onChangeNumber} = modalWithFormProps;
    const close = () => setShowEditFormForBook();

    async function doSubmit(tempObject) {
        return await editBook({
            id: showEditFormForBook.id,
            title: tempObject.title,
            author: tempObject.author,
            priceInEur: tempObject.priceInEur
        });
    }

    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="Edit the book"
                          isOpen={isLoggedIn && showEditFormForBook}
                          close={close}
                          doSubmit={doSubmit}>
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