package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Krant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KrantRepository extends CrudRepository<Krant,Integer> {
    @Query("SELECT k FROM Krant k WHERE (:min IS NULL OR k.oplage >= :min) AND (:max IS NULL OR k.oplage <= :max) ORDER BY k.oplage")
    Iterable<Krant> findByOplageInBereik(@Param("min") Long min, @Param("max") Long max);
}
