package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Genre;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface GenreService {
    Iterable<Genre> findAll();
    Optional<Genre> findById(int id);
    void deleteById(int id);
    Optional<Genre> findByName(String name);
    Genre save(Genre genre);
}

