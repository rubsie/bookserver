import React from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitialObject} from "./modal";

/** @return {null} */
export function CreateForm(props) {
    const {show, close} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const modalWithFormProps = usePropsForModalWithInitialObject({title: "", author: "", priceInEur: ""});
    const {tempObject, firstInputRefElement, onChange, onChangeNumber} = modalWithFormProps;
    const {createBook} = useBooksContext();

    async function doSubmit(tempObject) {
        return await createBook(tempObject);
    }

    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="New book"
                          isOpen={isLoggedIn && show}
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
            <Form.Control required alue={tempObject && tempObject.author}
                          onChange={e => onChange(e, "author")}/> </Form.Group>
        <Form.Group controlId="price">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}