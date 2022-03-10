package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Tijdschrift;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface TijdschriftService {
    Iterable<Tijdschrift>findAll();
    Iterable<Tijdschrift>findByNaamContainingIgnoreCase(String str);
    Optional<Tijdschrift> findById(long id);
    Tijdschrift save(Tijdschrift tijdschrift);
    void deleteById(long id);
}
