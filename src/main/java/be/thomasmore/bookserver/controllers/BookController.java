package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @ApiOperation(value = "find all the books that are stored in the database - " +
            "or if Request Parameter titleKeyWord is given all books where the title contains this titleKeyWord (ignore-case)")
    @GetMapping("/books")
    public Iterable<Book> findAll(@RequestParam(required = false) String titleKeyWord) {
        logger.info("##### findAll - titleKeyWord=" + titleKeyWord);

        if (titleKeyWord == null)
            return bookRepository.findAll();
        else
            return bookRepository.findByTitleContainingIgnoreCase(titleKeyWord);
    }


    @CrossOrigin
    @PostMapping("/books")
    public Book create(@RequestBody Book book) {
        logger.info("##### create");
        if (bookRepository.findByTitle(book.getTitle()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Book with title %s already exists.", book.getTitle()));
        return bookRepository.save(book);
    }

    @CrossOrigin
    @PutMapping("/books/{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        logger.info("##### edit");
        if (book.getId() != id) return null;
        Optional<Book> bookFromDb = bookRepository.findById(id);
        if (bookFromDb.isPresent()) {
            return bookRepository.save(book);
        }
        return null;
    }

    @CrossOrigin
    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable int id) {
        logger.info("##### delete");
        bookRepository.deleteById(id);
    }
}
