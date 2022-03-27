import {useGenresContext} from "../contexts/genresContext";
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

export function EditGenre(props){
    const {genres, deleteGenre, editGenre} = useGenresContext();
    const [inputs, setInputs] = useState({});
    const {showEditGenre, close} = props;

    const handleUpdate = (event) => {
        event.preventDefault();
        editGenre(inputs);
        close();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteGenre(inputs.id);
        close();
    }

    const handleChangeSelect = (event) => {
        event.preventDefault();
        console.log("#########options value:"+event.target.value);
        let genreName = genres.filter(g => g.id==parseInt(event.target.value));
        console.log(JSON.stringify(genreName));
        setInputs({name:genreName[0].name, id:parseInt(event.target.value)});
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInputs({...inputs, name:event.target.value})
    }

    return <>
        <Modal show={showEditGenre} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Edit an genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select className="mb-3" aria-label="Select an genre" onChange={handleChangeSelect}>
                    {genres.map(g => <option value={g.id} key={g.id}>{g.name}</option>)}
                </Form.Select>
                <Form.Control type="text" name="author" value={inputs.name} onChange={handleChange}></Form.Control>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={(e) => handleDelete(e)}>
                    Delete
                </Button>
                <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}