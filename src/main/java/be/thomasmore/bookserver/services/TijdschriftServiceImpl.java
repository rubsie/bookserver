package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Tijdschrift;
import be.thomasmore.bookserver.repositories.TijdschriftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TijdschriftServiceImpl implements TijdschriftService{
    @Autowired
    private TijdschriftRepository tijdschriftRepository;

    @Override
    public Iterable<Tijdschrift> findAll() {
        return tijdschriftRepository.findAll();
    }
}
