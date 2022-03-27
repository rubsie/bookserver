import React, {useState} from "react";
import {useGenresContext} from "../contexts/genresContext";
import {Button, Form, Modal} from "react-bootstrap";

export function CreateGenre(props) {
    const {showCreateNewGenre, close} = props;
    const [inputs, setInputs] = useState({});
    const {createGenre} = useGenresContext();

    const handleSave = async (event) => {
        event.preventDefault();
        let bodyObject = {name: inputs.genre}
        let result = await createGenre(bodyObject)
        console.log('----------- create genre result of fetchPOST: ' + JSON.stringify(result))
        setInputs({name: ''})
        close();
    }

    const handleClose = () => {
        close();
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInputs({...inputs, [event.target.name]: event.target.value})
    }

    return <>
        <Modal show={showCreateNewGenre} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form><Form.Control type="text" name="genre" value={inputs.genre} onChange={handleChange}/></Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={(e) => handleSave(e)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>

}