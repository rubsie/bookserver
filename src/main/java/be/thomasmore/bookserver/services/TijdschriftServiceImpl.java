package be.thomasmore.bookserver.services;

import be.thomasmore.bookserver.model.Tijdschrift;
import be.thomasmore.bookserver.repositories.TijdschriftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TijdschriftServiceImpl implements TijdschriftService{
    @Autowired
    private TijdschriftRepository tijdschriftRepository;

    @Override
    public Iterable<Tijdschrift> findAll() {
        return tijdschriftRepository.findAll();
    }

    @Override
    public Iterable<Tijdschrift> findByNaamContainingIgnoreCase(String str) {
        return tijdschriftRepository.findByNaamContainingIgnoreCase(str);
    }

    @Override
    public Optional<Tijdschrift> findById(long id) {
        return tijdschriftRepository.findById(id);
    }

    @Override
    public Tijdschrift save(Tijdschrift tijdschrift) {
        return tijdschriftRepository.save(tijdschrift);
    }

    @Override
    public void deleteById(long id) {
        tijdschriftRepository.deleteById(id);
    }


}
