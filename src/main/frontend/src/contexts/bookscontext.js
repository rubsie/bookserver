import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {fetchWithCsrf} from "../utilities/fetch";
import {useFetchContext} from "./fetchcontext";

const BooksContext = createContext();
const defaultHeaders = {
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest'
};

export function BooksProvider(props) {
    const [books, setBooks] = useState([]);
    const {setMessage, setIsLoading} = useMessageContext();
    const {fetchGet, fetchPut} = useFetchContext();

    const getBooks = useCallback(async () => {
        const result = await fetchGet("api/books", setMessage, setIsLoading);
        setBooks(result);
    }, [setIsLoading, setBooks, setMessage]);

    const editBook = useCallback(async (book) => {
        if (!book) return;
        const result = await fetchPut(`/api/books/${book.id}`, book);
        if (result) {
            setBooks(books.map((b) => b.id === book.id ? book : b));
            setMessage(`book ${book.title} modified`);
        }
    }, [setIsLoading, books, setBooks, setMessage]);

    const createBook = useCallback(async (book) => {
        console.log(`async createBook ${JSON.stringify(book)}`);
        setIsLoading(true);

        const fetchOptions = {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(book)
        };
        try {
            const response = await fetchWithCsrf(`/api/books`, fetchOptions);
            const body = await response.json();
            if (response.ok) {
                console.log(`   async createBook: received response ${JSON.stringify(body)}`);
                setBooks([...books, body]);
                console.log("   async createBook: done");
                setMessage(`book ${book.title} created`);
            } else {
                console.log(`   async createBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                const errorMessage = body.errors &&
                    body.errors.reduce((accumulator, error) => `${accumulator} ${error.defaultMessage}  --- `, "--- ");
                console.log(`   ${JSON.stringify(body)}`);
                console.log(`   ${errorMessage}`);
                setMessage(errorMessage || body.message);
            }
        } catch (e) {
            console.log(`   async createBook: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }, [setIsLoading, books, setBooks, setMessage]);


    const deleteBook = useCallback(async (book) => {
        console.log("async deleteBook");
        setIsLoading(true);

        const fetchOptions = {
            method: 'DELETE',
            headers: defaultHeaders,
        };
        try {
            const response = await fetchWithCsrf(`/api/books/${book.id}`, fetchOptions);
            if (response.ok) {
                console.log(`   async deleteBook: received response `);
                setBooks(books.filter((b) => b.id !== book.id));
                console.log("   async deleteBook: done");
                setMessage(`book ${book.title} deleted`);
            } else {
                const body = await response.json();
                console.log(`   async deleteBook: ERROR: ${response.status} - ${body.error} - ${body.message} `);
                setMessage(body.message);
            }
        } catch (e) {
            console.log(`   async deleteBook: ERROR ${e}`);
            setMessage("Connection error");
        }
        setIsLoading(false);
    }, [setIsLoading, books, setBooks, setMessage]);

    useEffect(() => {
        console.log("useEffect BooksContext");
        getBooks();
    }, [getBooks]);


    const api = useMemo(() => ({books, setBooks, getBooks, editBook, createBook, deleteBook}),
        [books, setBooks, getBooks, editBook, createBook, deleteBook]);

    return <BooksContext.Provider value={api}>
        {props.children}
    </BooksContext.Provider>

}

export const useBooksContext = () => useContext(BooksContext);