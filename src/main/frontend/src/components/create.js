import React, {useCallback, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useFetchContext} from "../contexts/fetchcontext";
import {useAuthorsContext} from "../contexts/authorscontext";

export function CreateNew(props) {
    const {showCreateNewType, close} = props;
    const [inputs, setInputs] = useState({});
    //const {fetchPOST} = useFetchContext();
    const {setIsAuthorsDirty, createAuthor} = useAuthorsContext();
    console.log("------------:" + showCreateNewType);


    const handleSave = async (event) => {
        event.preventDefault();
        let bodyObject = {name: inputs.author}
        let result = await createAuthor(bodyObject)
        console.log('----------- create author result of fetchPOST: '+JSON.stringify(result))
        setInputs({name: ''})
        close();
        setIsAuthorsDirty(true);
    }

    const handleClose = (event) => {
        //event.preventDefault();
        close();
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    return <Modal show={showCreateNewType} onHide={handleClose}>
        <div>Create a new author</div>
        <Form><Form.Control type="text" name="author" value={inputs.author} onChange={handleChange}/></Form>
        <Button className="m-1" size='sm' color="light" onClick={handleClose}>
            Cancel
        </Button>
        <Button className="m-1" size='sm' color="light" onClick={(e) => handleSave(e)}>
            Save
        </Button>
    </Modal>
}