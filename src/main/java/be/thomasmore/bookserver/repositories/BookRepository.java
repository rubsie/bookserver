package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Book;
import org.springframework.data.repository.CrudRepository;


public interface BookRepository extends CrudRepository<Book, Integer> {
}