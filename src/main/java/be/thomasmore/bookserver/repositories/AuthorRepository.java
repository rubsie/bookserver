package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AuthorRepository extends CrudRepository<Author, Integer> {
    List<Author> findByIdIn(@Param("ids") int[] ids);

    Optional<Author> findByName(String name);

    Optional<Author> findAuthorById(int id);
}
