package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Tijdschrift;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface TijdschriftRepository extends CrudRepository<Tijdschrift,Long> {
    Iterable<Tijdschrift>findByNaamContainingIgnoreCase(String str);
}
