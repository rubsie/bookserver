import React, {useState} from "react";
import {useAuthorsContext} from "../contexts/authorscontext";
import {Button, Form, Modal} from "react-bootstrap";

export function EditAuthor(props){
    const {authors,deleteAuthor, editAuthor} = useAuthorsContext();
    const [inputs, setInputs] = useState({})
    const {showEditAuthor, close} = props;

    const handleUpdate = (event) => {
        event.preventDefault();
        editAuthor(inputs);
        close();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteAuthor(inputs.id);
        close();
    }

    const handleChangeSelect = (event) => {
        event.preventDefault();
        console.log("#########options value:"+event.target.value)
        let authorName = authors.filter(a => a.id==parseInt(event.target.value))
        console.log(JSON.stringify(authorName))
        setInputs({name:authorName[0].name, id:parseInt(event.target.value)});
    }

    const handleChange = (event) => {
        event.preventDefault();
        setInputs({...inputs, name:event.target.value})
    }


    return <Modal show={showEditAuthor} onHide={close}>
        <div>Edit an author</div>
        <Form.Select aria-label="Select an author" onChange={handleChangeSelect}>
            {authors.map(a => <option value={a.id} key={a.id}>{a.name}</option>)}
        </Form.Select>
        <Form.Control type="text" name="author" value={inputs.name} onChange={handleChange}>

        </Form.Control>
        <Button className="m-1" size='sm' color="light" onClick={close}>
            Cancel
        </Button>
        <Button className="m-1" size='sm' color="light" onClick={(e) => handleUpdate(e)}>
            Update name
        </Button>
        <Button className="m-1" size='sm' color="light" onClick={(e) => handleDelete(e)}>
            Delete selected author
        </Button>

    </Modal>
}