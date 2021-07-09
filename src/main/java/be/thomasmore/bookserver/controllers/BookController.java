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

    @ApiOperation(value = "find all the books that are stored in the database - " +
            "or if Request Parameter titleKeyWord is given all books where the title contains this titleKeyWord (ignore-case)")
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


    @ApiOperation(value = "create a new book in the database - " +
            "the objects in the author array have to contain ids that exist in the author table.")
    @PostMapping("")
    public BookDTO create(@Valid @RequestBody BookDTO bookDto) {
        log.info("##### create book");
        if (bookRepository.findByTitle(bookDto.getTitle()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with title %s already exists.", bookDto.getTitle()));
        Book book = convertToEntity(bookDto);
        //todo: author names not filled in
        return convertToDto(bookRepository.save(book));
    }

    //TODO @Valid
    @PutMapping("{id}")
    public BookDTO edit(@PathVariable int id, @RequestBody BookDTO bookDto) {
        log.info(String.format("##### edit book %d", id));
        if (bookDto.getId() != id)
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("id %d does not match.", id));

        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        Book book = convertToEntity(bookDto, bookFromDb.get());
        Book savedBook = bookRepository.save(book);
        return convertToDto(savedBook);
    }

    @ApiOperation(value = "find the authors for the given book. ")
    @GetMapping("{id}/authors")
    public Iterable<AuthorDTO> authorsForBook(@PathVariable int id) {
        log.info(String.format("##### get authors for book with id %d", id));
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        ArrayList<AuthorDTO> authorsDTO = new ArrayList<>();
        for (Author a : bookFromDb.get().getAuthors()) authorsDTO.add(convertToDto(a));
        return authorsDTO;
    }


    //TODO @Valid
    @PutMapping("{id}/authors")
    public BookDTO editAuthorsForBook(@PathVariable int id, @RequestBody Collection<BookDTO.BookAuthorDTO> authors) {
        log.info(String.format("##### edit authors for book %d", id));

        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        Book book =  bookFromDb.get();
        ArrayList<Author> authorIds = new ArrayList<>();
        for (BookDTO.BookAuthorDTO a: authors) authorIds.add(new Author(a.getId()));
        book.setAuthors(authorIds);
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
     * so that the client does not need to do a second request to display this info.
     */
    private BookDTO convertToDto(Book book) {
        BookDTO bookDto = modelMapper.map(book, BookDTO.class);
        ArrayList<BookDTO.BookAuthorDTO> authors = new ArrayList<>();
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
//        if (bookDto.getAuthors() != null) {
//            int[] authorIds = bookDto.getAuthors().stream().mapToInt(a -> a.getId()).toArray();
//            List<Author> authorsFromDb = authorRepository.findByIdIn(authorIds);
//            for (Author a : book.getAuthors()) authorsFromDb.add(new Author(a.getId()));
//            book.setAuthors(authorsFromDb);
//        }
        return book;
    }

    private AuthorDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDTO.class);
    }

}
