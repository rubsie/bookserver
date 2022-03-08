package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Krant;
import be.thomasmore.bookserver.repositories.KrantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/kranten")
public class KrantController {
    @Autowired
    private KrantRepository krantRepository;

    @GetMapping("")
    public  Iterable<Krant> findAll(){
        log.info("##### findAll kranten");
        return krantRepository.findAll();
    }
}
