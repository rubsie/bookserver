package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
        Iterable<Book> books = bookRepository.findAll();
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return books;
    }
}
