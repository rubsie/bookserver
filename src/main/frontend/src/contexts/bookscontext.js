import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useMessageContext} from "./messagecontext";
import {useFetchContext} from "./fetchcontext";

const BooksContext = createContext();

export function BooksProvider(props) {
    const [books, setBooks] = useState([]);
    const [isBooksDirty, setIsBooksDirty] = useState(true);
    const {setMessage} = useMessageContext();
    const {fetchGET, fetchPUT, fetchPOST, fetchDELETE} = useFetchContext();

    console.log({isBooksDirty, books});

    const getBooks = useCallback(async () => {
        setIsBooksDirty(true);
    }, [setIsBooksDirty]);

    const editAuthorsForBook = useCallback(async (book, authorIds) => {
        if (!book) return;
        const savedBook = await fetchPUT(`/api/books/${book.id}/authors`, authorIds);
        if (savedBook) setIsBooksDirty(true);
        return savedBook;
    }, [fetchPUT, setIsBooksDirty]);


    //returns the new book object
    //if creation on server failed the return value is undefined
    //note: fetchPOST returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const createBookWithAuthors = useCallback(async (book, authorIds) => {
        if (!book) return;
        const savedBook = await fetchPOST(`/api/books`, book);
        if (!savedBook) return;
        const savedBookWithAuthors = await editAuthorsForBook(savedBook, authorIds);
        if (savedBookWithAuthors) setIsBooksDirty(true);
        setMessage(`book ${book.title} created`);
        return savedBookWithAuthors;
    }, [fetchPOST, setMessage, editAuthorsForBook, setIsBooksDirty]);

    //PUT returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const editBook = useCallback(async (book) => {
        if (!book) return;
        const savedBook = await fetchPUT(`/api/books/${book.id}`, book);
        if (!savedBook) return;
        setIsBooksDirty(true);
        setMessage(`book ${book.title} modified`);
        return savedBook;
    }, [fetchPUT, setMessage, setIsBooksDirty]);

    //PUT returns the new book object -- it will contain fields that are generated by the server (eg: id)
    const editBookWithAuthors = useCallback(async (book, authorIds) => {
        if (!book) return;
        const savedBook = await fetchPUT(`/api/books/${book.id}`, book);
        if (!savedBook) return;
        const savedBookWithAuthors = await editAuthorsForBook(savedBook, authorIds);
        setIsBooksDirty(true);
        setMessage(`book ${book.title} modified`);
        return savedBookWithAuthors;
    }, [fetchPUT, setMessage, editAuthorsForBook, setIsBooksDirty]);

    const deleteBook = useCallback(async (book) => {
        const result = await fetchDELETE(`/api/books/${book.id}`);
        if (result) {
            setIsBooksDirty(true);
            setMessage(`book ${book.title} deleted`);
        }
    }, [fetchDELETE, setMessage, setIsBooksDirty]);

    //when app opens (on first render) we get the books from the server
    //also when anyone marks books as dirty we get the books from the server
    useEffect(() => {
        console.log(`useEffect BooksContext`, {isBooksDirty});
        const fetchBooksIfDirty = async () => {
            if (!isBooksDirty) return;
            const fetchedBooks = await fetchGET("api/books");
            if (fetchedBooks) {
                setBooks(fetchedBooks);
                setIsBooksDirty(false);
            }
        };
        fetchBooksIfDirty();
    }, [isBooksDirty, fetchGET, setBooks, setIsBooksDirty]);

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