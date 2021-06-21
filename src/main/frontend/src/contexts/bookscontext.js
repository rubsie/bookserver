import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {useFetchContext} from "./fetchcontext";

const BooksContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState([]);
    const {setMessage} = useMessageContext();
    const {fetchGET, fetchPUT, fetchPOST, fetchDELETE} = useFetchContext();

    console.log({books});

    const getBooks = useCallback(async () => {
        const result = await fetchGET("api/books");
        setBooks(result);
    }, [fetchGET, setBooks]);

    //PUT returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const editBook = useCallback(async (book) => {
        if (!book) return;
        const result = await fetchPUT(`/api/books/${book.id}`, book);
        if (result) {
            setBooks(books.map((b) => b.id === result.id ? result : b));
            setMessage(`book ${book.title} modified`);
        }
    }, [fetchPUT, books, setBooks, setMessage]);

    //POST returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const createBook = useCallback(async (book) => {
        const result = await fetchPOST(`/api/books`, book);
        if (result) {
            setBooks([...books, result]);
            setMessage(`book ${book.title} created`);
        }
    }, [fetchPOST, books, setBooks, setMessage]);


    const deleteBook = useCallback(async (book) => {
        const result = await fetchDELETE(`/api/books/${book.id}`);
        if (result) {
            setBooks(books.filter((b) => b.id !== book.id));
            setMessage(`book ${book.title} deleted`);
        }
    }, [fetchDELETE, books, setBooks, setMessage]);

    //when app opens (on first render) we get the books from the server
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