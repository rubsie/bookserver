package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Krant;
import be.thomasmore.bookserver.repositories.KrantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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
        Krant nieweKrant = krantRepository.save(krant);
        return nieweKrant;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable int id) {
        log.info("##### delete krant -- id=" + id);
        Optional<Krant> optKrant = krantRepository.findById(id);
        if (optKrant.isPresent())
            krantRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Krant met id %d bestaat niet", id));
    }

    @PutMapping("{id}")
    public void edit(@PathVariable int id,
                     @RequestBody Krant krant){
        log.info("##### edit krant -- id=" + id);
        Optional<Krant> optKrant = krantRepository.findById(id);
        if (optKrant.isPresent())
            krantRepository.save(krant);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Krant met id %d bestaat niet", id));
    }
}
