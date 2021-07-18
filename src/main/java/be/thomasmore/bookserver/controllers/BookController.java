package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDTO;
import be.thomasmore.bookserver.repositories.AuthorRepository;
import be.thomasmore.bookserver.repositories.BookRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@Slf4j
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ApiOperation(value = "list of books in the database.",
            notes = "If Request Parameter <b>titleKeyWord</b> is given: " +
                    "only books where the title contains this titleKeyWord (ignore-case). </br>" +
                    "Otherwise all books are returned. </br>" +
                    "</br>" +
                    "The authors Collection contains only id and name. </br>" +
                    "Use GET api/authors/{id}/authors  to fetch more info about the authors. ")
    @GetMapping("")
    public Iterable<BookDTO> findAll(@RequestParam(required = false) String titleKeyWord) {
        log.info("##### findAll books - titleKeyWord=" + titleKeyWord);
        final Iterable<Book> books = (titleKeyWord == null) ?
                bookRepository.findAll() :
                bookRepository.findByTitleContainingIgnoreCase(titleKeyWord);
        ArrayList<BookDTO> booksDTO = new ArrayList<>();
        for (Book b : books) booksDTO.add(convertToDto(b));
        return booksDTO;
    }

    @ApiOperation(value = "create a new book in the database.",
            notes = "The authors are <b>not</b> updated in the new book.</br>" +
                    "Use PUT api/books/{id}/authors to update those. </br>" +
                    "</br>" +
                    "Returns new book (containing id from database). ")
    @PostMapping("")
    public BookDTO create(@Valid @RequestBody BookDTO bookDto) {
        log.info("##### create book");
        if (bookRepository.findByTitle(bookDto.getTitle()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with title %s already exists.", bookDto.getTitle()));
        Book book = convertToEntity(bookDto);
        return convertToDto(bookRepository.save(book));
    }

    //TODO @Valid
    @ApiOperation(value = "edit existing book in the database.",
            notes = "The authors are <b>not</b> updated in the new book.</br>" +
                    "Use PUT api/books/{id}/authors to update those. </br>" +
                    "</br>" +
                    "Returns updated book. ")
    @PutMapping("{id}")
    public BookDTO edit(@PathVariable int id, @RequestBody BookDTO bookDto) {
        log.info(String.format("##### edit book %d", id));
        if (bookDto.getId() != id)
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("id in book (%d) does not match id in url (%d).", bookDto.getId(), id));

        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        //overwrite fields present in bookDto - relations are not touched
        Book book = convertToEntity(bookDto, bookFromDb.get());
        Book savedBook = bookRepository.save(book);
        return convertToDto(savedBook);
    }

    @ApiOperation(value = "find the authors for the given book. ",
            notes = "Returns authors collection that contains only id and name. </br>" +
                    "Use GET api/authors/{id}/authors to fetch more info about the authors. ")
    @GetMapping("{id}/authors")
    public Iterable<AuthorDTO> authorsForBook(@PathVariable int id) {
        log.info(String.format("##### get authors for book with id %d", id));
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        ArrayList<AuthorDTO> authorsDTO = new ArrayList<>();
        if (bookFromDb.get().getAuthors() != null)
            for (Author a : bookFromDb.get().getAuthors()) authorsDTO.add(convertToDto(a));
        return authorsDTO;
    }


    //TODO @Valid
    @ApiOperation(value = "update the authors for the given book. ",
            notes = "The authors Collection has to contain ids of existing authors. </br>" +
                    "Returns updated book containing id and name of the authors. ")
    @PutMapping("{id}/authors")
    public BookDTO editAuthorsForBook(@PathVariable int id, @RequestBody Collection<Integer> authorIds) {
        log.info(String.format("##### edit authors for book %d", id));

        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        Book book = bookFromDb.get();
        ArrayList<Author> authorIdObjects = new ArrayList<>();
        if (authorIds != null)
            for (Integer authorId : authorIds) authorIdObjects.add(new Author(authorId));
        book.setAuthors(authorIdObjects);
        Book savedBook = bookRepository.save(book);
        return convertToDto(savedBook);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable int id) {
        log.info(String.format("##### delete book %d", id));
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        bookRepository.deleteById(id);
    }

    /**
     * @param book the entity from the db
     * @return BookDTO object to send to the client.
     * The BookDTO contains an array of  BookDTO.AuthorDto
     * so that the client does not need to do a second request to display this basic info.
     */
    private BookDTO convertToDto(Book book) {
        BookDTO bookDto = modelMapper.map(book, BookDTO.class);
        ArrayList<BookDTO.BookAuthorDTO> authors = new ArrayList<>();
        if (book.getAuthors() != null)
            for (Author a : book.getAuthors())
                authors.add(new BookDTO.BookAuthorDTO(a.getId(), a.getName()));
        bookDto.setAuthors(authors);
        return bookDto;
    }

    /**
     * @param bookDto - can contain an array of BookDTO.authorDto objects.
     *                Each BookDTO.authorDto has to contain the id of an existing author.
     * @return the book entity object - ready to save in the database
     */
    private Book convertToEntity(BookDTO bookDto) {
        Book book = modelMapper.map(bookDto, Book.class);
        ArrayList<Author> authors = new ArrayList<>();
        //if this is used to save, it updates book-author relation, not the author objects!
        if (book.getAuthors() != null)
            for (Author a : book.getAuthors()) authors.add(new Author(a.getId()));
        book.setAuthors(authors);
        return book;
    }

    /**
     * @param bookDto the data from client that has to be converted
     * @param book:   the original book entity (from db) - this object will be overwritten with the data from bookDto
     * @return the modified book entity object - ready to save in the database
     * Do not overwrite the authors-array.
     * Use the PUT request api/books/{id}/authors to update the authors for a book.
     */
    private Book convertToEntity(BookDTO bookDto, Book book) {
        modelMapper.map(bookDto, book);
        return book;
    }

    private AuthorDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDTO.class);
    }

}
