package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Tijdschrift;
import be.thomasmore.bookserver.services.TijdschriftService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public Iterable<Tijdschrift> findByNaamContainingIgnoreCase(@RequestParam (required=false) String zoekterm) {
        log.info("##### findAll tijdschriften");
        return tijdschriftService.findByNaamContainingIgnoreCase(zoekterm);
    }
}
