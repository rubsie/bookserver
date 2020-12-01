package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.repositories.BookRepository;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    Logger logger = LoggerFactory.getLogger(BookController.class);

    @CrossOrigin
    @ApiOperation(value="find all the books that are stored in the database")
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
    @PutMapping("/books/{id}")
    public Book edit(@PathVariable int id, @RequestBody Book book) {
        logger.info("##### edit");
        if (book.getId()!=id) return null;
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
