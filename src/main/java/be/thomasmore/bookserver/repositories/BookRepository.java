package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Book;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BookRepository extends CrudRepository<Book, Integer>, JpaSpecificationExecutor<Book> {

    Optional<Book> findByTitle(String title);

    Iterable<Book> findByTitleContainingIgnoreCase(String titleKeyWord);


}