package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Stripreeks;
import be.thomasmore.bookserver.repositories.StripreeksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/stripreeksen")
public class StripreeksController {
    @Autowired
    private StripreeksRepository stripreeksRepository;

    @GetMapping("")
    Iterable<Stripreeks>getAll(){
        return stripreeksRepository.findAll();
    }

    @PostMapping()
    public Stripreeks create(@RequestBody Stripreeks stripreeks) {
        try {
            Stripreeks nieuweStripreeks = stripreeksRepository.save(stripreeks);
            return nieuweStripreeks;
        }catch(DataIntegrityViolationException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("Stripreeks met naam %s bestaat al.", stripreeks.getNaam()));
        }
    }
}
