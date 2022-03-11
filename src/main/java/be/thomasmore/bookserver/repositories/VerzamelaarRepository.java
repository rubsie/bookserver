package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Verzamelaar;
import org.springframework.data.repository.CrudRepository;

public interface VerzamelaarRepository extends CrudRepository<Verzamelaar,Integer> {
}
