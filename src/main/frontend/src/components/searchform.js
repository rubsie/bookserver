import React, {useState} from "react";
import {useBooksContext} from "../contexts/bookscontext";
import {Col, Form, Button, Card} from "react-bootstrap";
import {Row} from "react-bootstrap";

export function Search() {
    const {fetchGET, setBooks} = useBooksContext();
    const [inputs, setInputs] = useState({});

    const handleChange = event => {
        event.preventDefault();
        setInputs(values => ({...values, [event.target.name]: event.target.value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let url = "/api/books/search?minprice="
            + `${(inputs.minprice === undefined) ? 0 : inputs.minprice}`
            + "&maxprice=" + `${(inputs.maxprice === undefined) ? 999 : inputs.maxprice}`
            + "&title=" + `${(inputs.title === undefined) ? '' : inputs.title}`
            + "&author=" + `${(inputs.author === undefined) ? '' : inputs.author}`
        console.log("-------------url with searchstring: " + url)
        const searchedBooks = await fetchGET(url)
        setBooks(searchedBooks);
    }


    return <Card>
        <Card.Header>Search for books matching all the inputs below</Card.Header>
        <Row>
            <Form onSubmit={handleSubmit} className="d-flex">
                <Col lg={2} sm={10} className="m-2">
                    <Form.Control type="text" name="title" placeholder="Book title" value={inputs.title}
                                  onChange={handleChange}/></Col>
                <Col lg={2} sm={10} className="m-2">
                    <Form.Control type="text" name="author" placeholder="Author" value={inputs.author}
                                  onChange={handleChange}/></Col>
                <Col lg={2} sm={10} className="m-2">
                    <Form.Control type="number" name="minprice" placeholder="Minimum book price" value={inputs.minprice}
                                  onChange={handleChange}/></Col>
                <Col lg={2} sm={10} className="m-2">
                    <Form.Control type="number" name="maxprice" placeholder="Maximum book price" value={inputs.maxprice}
                                  onChange={handleChange}/></Col>
                <Col lg={1} sm={4} className="m-2">
                    <Button variant="primary" type="submit">Search</Button></Col>
            </Form>
        </Row>
    </Card>
}