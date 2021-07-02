package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, Integer> {
}
