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
        if (result) {
            setBooks(result);
        }
    }, [fetchGET, setBooks]);

    const editAuthorsForBook = useCallback(async (book, authors) => {
        if (!book) return;
        //returns book with saved authors
        const result = await fetchPUT(`/api/books/${book.id}/authors`, authors);
        if (result) {
            setBooks(books.map((b) => b.id === result.id ? result : b));
        }
        return result;
    }, [fetchPUT, books, setBooks]);


    //returns the new book object
    //if creation on server failed the return value is undefined
    //note: fetchPOST returns the new book object -- it will contain fields that are generated by the server (eg: id)
    //note: setBooks has to be done here at the end because books will not yet be updated in the other callbacks
    const createBookWithAuthors = useCallback(async (book, authorIds) => {
        if (!book) return;
        const savedBook = await fetchPOST(`/api/books`, book);
        if (!savedBook) return;
        const bookSavedWithAuthors = await editAuthorsForBook(savedBook, authorIds);
        setBooks([...books, bookSavedWithAuthors]);
        setMessage(`book ${book.title} created`);
        return bookSavedWithAuthors;
    }, [fetchPOST, books, setBooks, editAuthorsForBook, setMessage]);


    //PUT returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const editBook = useCallback(async (book) => {
        if (!book) return;
        const result = await fetchPUT(`/api/books/${book.id}`, book);
        if (result) {
            setBooks(books.map((b) => b.id === result.id ? result : b));
            setMessage(`book ${book.title} modified`);
        }
        return result;
    }, [fetchPUT, books, setBooks, setMessage]);

    //PUT returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const editBookWithAuthors = useCallback(async (book, authorIds) => {
        if (!book) return;
        const savedBook = await fetchPUT(`/api/books/${book.id}`, book);
        if (!savedBook) return;
        const bookSavedWithAuthors = await editAuthorsForBook(savedBook, authorIds);
        setBooks(books.map((b) => b.id === bookSavedWithAuthors.id ? bookSavedWithAuthors : b));
        setMessage(`book ${book.title} modified`);
        return bookSavedWithAuthors;
    }, [fetchPUT, books, setBooks, setMessage]);

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

    const api = useMemo(() => ({
            books,
            getBooks,
            editBook,
            editBookWithAuthors,
            editAuthorsForBook,
            createBookWithAuthors,
            deleteBook
        }),
        [books, getBooks, editBook, editBookWithAuthors, editAuthorsForBook, createBookWithAuthors, deleteBook]);

    return <BooksContext.Provider value={api}>
        {props.children}
    </BooksContext.Provider>

}

export const useBooksContext = () => useContext(BooksContext);