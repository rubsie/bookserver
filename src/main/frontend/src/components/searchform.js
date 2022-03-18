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
        const searchedBooks = await fetchGET(url);
        setBooks(searchedBooks);
    }


    return <Card>
        <Card.Header>Search for books</Card.Header>
        <Row>
            <Form onSubmit={handleSubmit}>
                <Col lg={2}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={inputs.title} onChange={handleChange}/></Col>
                <Col lg={2}>
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" value={inputs.author} onChange={handleChange}/></Col>
                <Col lg={2}>
                    <Form.Label>Min price</Form.Label>
                    <Form.Control type="number" name="minprice" value={inputs.minprice} onChange={handleChange}/></Col>
                <Col lg={2}>
                    <Form.Label>Max price</Form.Label>
                    <Form.Control type="number" name="maxprice" value={inputs.maxprice} onChange={handleChange}/></Col>
                <Col lg={2}>
                    <Button variant="primary" type="submit">Search</Button></Col>
            </Form>
        </Row>
    </Card>
}