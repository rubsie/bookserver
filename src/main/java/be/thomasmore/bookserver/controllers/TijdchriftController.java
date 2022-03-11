package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.exceptions.OngeldigTijdschriftException;
import be.thomasmore.bookserver.model.Tijdschrift;
import be.thomasmore.bookserver.services.TijdschriftService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tijdschriften")
@Slf4j
public class TijdchriftController {
    @Autowired
    private TijdschriftService tijdschriftService;

    @GetMapping("")
    public Iterable<Tijdschrift> findAll() {
        log.info("##### findAll tijdschriften");
        return tijdschriftService.findAll();
    }

    @GetMapping("/naam")
    public Iterable<Tijdschrift> findByNaamContainingIgnoreCase(@RequestParam(required = false) String zoekterm) {
        log.info("##### findAll tijdschriften");
        return tijdschriftService.findByNaamContainingIgnoreCase(zoekterm);
    }

    @GetMapping("{id}")
    public Tijdschrift read(@PathVariable long id) {
        log.info("##### read tijdschrift -- id=" + id);
        Optional<Tijdschrift> optTijdschrift = tijdschriftService.findById(id);
        if (optTijdschrift.isPresent())
            return optTijdschrift.get();
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Tijdschrift met id %d bestaat niet", id));
    }

    @PostMapping()
    public Tijdschrift create(@RequestBody @Valid Tijdschrift tijdschrift, BindingResult bindingResult) {
        log.info("##### create tijdschrift");
        if (bindingResult.hasErrors()) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            OngeldigTijdschriftException ongeldigTijdschriftException = new OngeldigTijdschriftException(HttpStatus.BAD_REQUEST);
            for(FieldError fieldError : fieldErrors){
                ongeldigTijdschriftException.voegFoutomschrijvingToe(fieldError.getObjectName()
                        + "." + fieldError.getField()
                        + " " + fieldError.getDefaultMessage());
                throw ongeldigTijdschriftException;
            }
        }
        return tijdschriftService.save(tijdschrift);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable long id) {
        log.info("##### delete krant -- id=" + id);
        Optional<Tijdschrift> optTijdschrift = tijdschriftService.findById(id);
        if (optTijdschrift.isPresent())
            tijdschriftService.deleteById(id);
        else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Tijdschrift met id %d bestaat niet", id));
    }

    @PutMapping("{id}")
    public Tijdschrift edit(@PathVariable int id,
                            @RequestBody Tijdschrift tijdschrift) {
        log.info("##### edit tijdschrift -- id=" + id);
        if (id != tijdschrift.getId())
            throw new ResponseStatusException((HttpStatus.INTERNAL_SERVER_ERROR), String.format("is in url %d komt niet overeen met id van tijdschrift %d", id, tijdschrift.getId()));

        Optional<Tijdschrift> optTijdschrift = tijdschriftService.findById(id);
        if (optTijdschrift.isPresent()) {
            Tijdschrift geupdateTijdschrift = tijdschriftService.save(tijdschrift);
            return geupdateTijdschrift;
        } else
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Tijdschrift met id %d bestaat niet", id));
    }
}
