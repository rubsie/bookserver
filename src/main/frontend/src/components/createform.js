import React from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitialObject} from "./modal";

export function CreateForm(props) {
    const {show, close} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const modalWithFormProps = usePropsForModalWithInitialObject({title: "", author: "", authors: [], priceInEur: ""});
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {createBook} = useBooksContext();

    async function doSubmit(tempObject) {
        return await createBook({...tempObject, authors: tempObject.authors.map(id => ({id}))});
    }

    console.log(`CreateForm`, {tempObject});
    /* TODO fill in authors iso author */
    /* TODO fill in authors from db iso hardcoded */
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
            <Form.Control value={tempObject && tempObject.author}
                          onChange={e => onChange(e, "author")}/> </Form.Group>
        <Form.Group controlId="authorIds">
            <Form.Label>authors: </Form.Label>
            <Form.Control as="select" multiple required value={tempObject && tempObject.authors}
                          onChange={e => onChangeSelect(e, "authors")}>
                <option value={1}>Margaret</option>
                <option value={2}>Haruki</option>
                <option value={3}>Erich</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}