package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.Genre;
import be.thomasmore.bookserver.services.GenreService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class GenreController {
    @Autowired
    GenreService genreService;

    @CrossOrigin
    @GetMapping("/genres")
    public Iterable<Genre> findAll() {
        log.info("##### findAll Genres");
        return genreService.findAll();
    }
}
