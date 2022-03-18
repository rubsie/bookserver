package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Krant;
import be.thomasmore.bookserver.repositories.KrantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("api/kranten")
public class KrantController {
    @Autowired
    private KrantRepository krantRepository;

    @GetMapping("")
    public Iterable<Krant> findAll() {
        log.info("##### findAll kranten");
        return krantRepository.findAll();
    }

    @GetMapping("/oplage")
    public Iterable<Krant> findKrantenByOplageInBereik(@RequestParam(required = false) Long min,
                                                       @RequestParam(required = false) Long max) {
        log.info("##### findKrantenByOplageInBereik -- min=" + min);
        log.info("##### findKrantenByOplageInBereik -- max=" + max);
        return krantRepository.findByOplageInBereik(min, max);
    }

    @GetMapping("{id}")
    public Krant read(@PathVariable int id) {
        log.info("##### read krant -- id=" + id);
        Optional<Krant> optKrant = krantRepository.findById(id);
        if (optKrant.isPresent())
            return optKrant.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Krant met id %d bestaat niet", id));
    }

    @PostMapping()
    public Krant create(@RequestBody Krant krant) {
        log.info("##### create krant");
        if(krantRepository.findByNaamIgnoreCase(krant.getNaam()).isPresent()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Krant met naam %s bestaat al.", krant.getNaam()));
        }
        Krant nieweKrant = krantRepository.save(krant);
        return nieweKrant;
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        log.info("##### delete krant -- id=" + id);
        Optional<Krant> optKrant = krantRepository.findById(id);
        if (optKrant.isPresent())
            krantRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Krant met id %d bestaat niet", id));
    }

    @PutMapping("{id}")
    public Krant edit(@PathVariable int id,
                     @RequestBody Krant krant){
        log.info("##### edit krant -- id=" + id);
        if(id!=krant.getId())
            throw new ResponseStatusException((HttpStatus.INTERNAL_SERVER_ERROR),String.format("is in url %d komt niet overeen met id van krant %d",id, krant.getId()));

        Optional<Krant> optKrant = krantRepository.findById(id);
        if (optKrant.isPresent()) {
            Krant geupdateKrant = krantRepository.save(krant);
            return geupdateKrant;
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Krant met id %d bestaat niet", id));
    }
}
