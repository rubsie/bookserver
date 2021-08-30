import React from "react";
import {useBooksContext} from "../contexts/bookscontext";
import {useAuthorsContext} from "../contexts/authorscontext";
import {ModalWithForm, usePropsForModalWithInitialObject} from "./modal";
import {Form} from "react-bootstrap";

export function CreateForm(props) {
    const {show, close} = props;
    const {createBookWithAuthors} = useBooksContext();
    const modalWithFormProps = usePropsForModalWithInitialObject({title: "", authorIds: [], priceInEur: ""});
    const {tempObject, firstInputRefElement, onChange, onChangeNumber, onChangeSelect} = modalWithFormProps;
    const {authors} = useAuthorsContext()

    async function doSubmit(tempObject) {
        console.log(`doSubmit`, {tempObject});
        return await createBookWithAuthors(tempObject, tempObject.authorIds);
    }

    console.log(`CreateForm`, {tempObject});
    /* TODO create book with new author  */
    return <ModalWithForm modalWithFormProps={modalWithFormProps}
                          title="New book"
                          isOpen={show}
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
            <Form.Control as="select" multiple required value={tempObject && tempObject.authors}
                          onChange={e => onChangeSelect(e, "authorIds")}>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
            <Form.Label>price (€): </Form.Label>
            <Form.Control value={tempObject && tempObject.priceInEur} type="number" min="0" max="2000"
                          onChange={e => onChangeNumber(e, "priceInEur")}/>
        </Form.Group>
    </ModalWithForm>;
}