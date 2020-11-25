package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

import static java.lang.Thread.sleep;

@RestController
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @GetMapping("/books")
    public Iterable<Book> findAll() {
        logger.info("##### findAll");
        return bookRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/books")
    public Book create(@RequestBody Book book) {
        logger.info("##### create");
        return bookRepository.save(book);
    }

    @CrossOrigin
    @PutMapping("/books")
    public Book edit(@RequestBody Book book) {
        logger.info("##### create");
        return bookRepository.save(book);
    }

    @CrossOrigin
    @DeleteMapping("/books/{id}")
    public void delete(@PathVariable int id) {
        logger.info("##### delete");
        bookRepository.deleteById(id);
    }
}
