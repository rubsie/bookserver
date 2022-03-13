package be.thomasmore.bookserver.repositories;

import be.thomasmore.bookserver.model.Stripalbum;
import be.thomasmore.bookserver.model.Stripreeks;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StripalbumRepository extends CrudRepository<Stripalbum,Integer> {
    Iterable<Stripalbum> findByKleur(boolean kleur);
    Iterable<Stripalbum> findByStripreeks(Stripreeks stripreeks);
    @Query("select album from Stripalbum album where album.stripreeks.genre = :genre")
    Iterable<Stripalbum> findByStripreeksGenre(@Param("genre") String genre);
}
