package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Genre;
import be.thomasmore.bookserver.repositories.GenreRepository;
import be.thomasmore.bookserver.services.GenreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/genres")
@Slf4j
public class GenreController {
    @Autowired
    GenreService genreService;

    @GetMapping("")
    public Iterable<Genre> findAll() {
        log.info("##### findAll Genres");
        return genreService.findAll();
    }

    @GetMapping("{id}")
    public Genre read(@PathVariable int id) {
        log.info("##### read genre -- id=" + id);
        Optional<Genre> optGenre = genreService.findById(id);
        if(optGenre.isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with id %d does not exist.", id));
        return optGenre.get();
    }

    @PostMapping("")
    public Genre create(@RequestBody Genre genre){
        log.info("##### create genre");
        if (genreService.findByName(genre.getName()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with name %s already exists.", genre.getName()));
        return (genreService.save(genre));
    }
}
