package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Tijdschrift;
import org.springframework.stereotype.Service;

public interface TijdschriftService {
    Iterable<Tijdschrift>findAll();
    Iterable<Tijdschrift>findByNaamContainingIgnoreCase(String str);
}
