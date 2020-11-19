package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static java.lang.Thread.sleep;

@RestController
public class BookController {
    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @GetMapping("/books")
    public List<Book> findAll() {
        logger.info("##### findAll");
        Book[] books = {new Book("MaddAddam"),
                new Book("The year of the flood"),
                new Book("Oryx and Crake")};
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Arrays.asList(books);
    }
}
