package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@Slf4j
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @ApiOperation(value = "find all the books that are stored in the database - " +
            "or if Request Parameter titleKeyWord is given all books where the title contains this titleKeyWord (ignore-case)")
    @GetMapping("")
    public Iterable<Book> findAll(@RequestParam(required = false) String titleKeyWord) {
        log.info("##### findAll - titleKeyWord=" + titleKeyWord);

        if (titleKeyWord == null)
            return bookRepository.findAll();
        else
            return bookRepository.findByTitleContainingIgnoreCase(titleKeyWord);
    }


    @PostMapping("")
    public Book create(@Valid @RequestBody Book book) {
        log.info("##### create");
        if (bookRepository.findByTitle(book.getTitle()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with title %s already exists.", book.getTitle()));
        return bookRepository.save(book);
    }

    @PutMapping("{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        log.info("##### edit");
        if (book.getId() != id) return null;
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        return bookRepository.save(book);
    }

    @DeleteMapping("{id}")
    public Book delete(@PathVariable int id) {
        log.info("##### delete");
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Book with id %d not found.", id));

        bookRepository.deleteById(id);
        return bookFromDb.get();
    }
}
