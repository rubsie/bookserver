import React from "react";
import Form from 'react-bootstrap/Form';
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {useBooksContext} from "../contexts/bookscontext";
import {ModalWithForm, usePropsForModalWithInitialObject} from "./modal";
import {useAuthorsContext} from "../contexts/authorscontext";

export function CreateForm(props) {
    const {show, close} = props;
    const {isLoggedIn} = useAuthenticationContext();
    const modalWithFormProps = usePropsForModalWithInitialObject({title: "", author: "", authors: [], priceInEur: ""});
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {createBook} = useBooksContext();
    const {authors} = useAuthorsContext()

    async function doSubmit(tempObject) {
        return await createBook({...tempObject, authors: tempObject.authors.map(id => ({id}))});
    }

    console.log(`CreateForm`, {tempObject});
    console.log({authors});
    /* TODO fill in authors iso author */
    /* TODO create book with new author  */
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
                {authors.map(a => <option value={a.id}>{a.name}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}