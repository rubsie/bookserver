package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Genre;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface GenreRepository extends CrudRepository<Genre, Integer> {
    Optional<Genre> findByName(String name);

    Optional<Genre> findGenreById(int id);
}
