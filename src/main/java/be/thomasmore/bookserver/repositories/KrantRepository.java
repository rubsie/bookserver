package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Krant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KrantRepository extends CrudRepository<Krant,Integer> {
}
