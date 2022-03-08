package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Krant;
import be.thomasmore.bookserver.repositories.KrantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

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

    @GetMapping("/oplage")
    @Transactional
    public Iterable<Krant> findKrantenByOplageInBereik(@RequestParam(required = false) Long min,
                                                       @RequestParam(required = false) Long max) {
        log.info("##### findKrantenByOplageInBereik -- min=" + min);
        log.info("##### findKrantenByOplageInBereik -- max=" + max);
        return krantRepository.findByOplageInBereik(min,max);
    }
}
