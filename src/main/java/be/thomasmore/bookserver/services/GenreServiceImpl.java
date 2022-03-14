package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Genre;
import be.thomasmore.bookserver.repositories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class GenreServiceImpl implements GenreService {

    @Autowired
    GenreRepository genreRepository;

    @Override
    public Iterable<Genre> findAll() {
        return genreRepository.findAll();
    }

    @Override
    public Optional<Genre> findById(int id) {
        return genreRepository.findById(id);
    }

    @Override
    public Optional<Genre> findByName(String name) {
        return genreRepository.findByName(name);
    }

    @Override
    public Genre save(Genre genre) {
        return genreRepository.save(genre);
    }
}
