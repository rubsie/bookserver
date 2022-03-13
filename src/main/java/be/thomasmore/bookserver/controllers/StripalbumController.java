package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Stripalbum;
import be.thomasmore.bookserver.model.Stripreeks;
import be.thomasmore.bookserver.model.dto.StripalbumDTO;
import be.thomasmore.bookserver.repositories.StripalbumRepository;
import be.thomasmore.bookserver.repositories.StripreeksRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/stripalbums")
public class StripalbumController {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private StripalbumRepository stripalbumRepository;
    @Autowired
    private StripreeksRepository stripreeksRepository;

    @GetMapping("")
    public Iterable<Stripalbum> findAll() {
        return stripalbumRepository.findAll();
    }

    @GetMapping("/kleur/{kleur}")
    public Iterable<StripalbumDTO> findByKleur(@PathVariable String kleur) {
        boolean isKleur = kleur.equalsIgnoreCase("yes");
        Iterable<Stripalbum> albums = stripalbumRepository.findByKleur(isKleur);
        List<StripalbumDTO> stripalbumDTOs = new ArrayList<>();
        for (Stripalbum a : albums)
            stripalbumDTOs.add(convertToStripalbumDTO(a));
        return stripalbumDTOs;
    }

    @GetMapping("/stripreeks/{id}")
    public Iterable<StripalbumDTO> findByStripreeks(@PathVariable int id) {
        Optional<Stripreeks> optStripreeks = stripreeksRepository.findById(id);
        if (optStripreeks.isPresent()) {
            Iterable<Stripalbum> stripalbums = stripalbumRepository.findByStripreeks(optStripreeks.get());
            List<StripalbumDTO> stripalbumDTOs = new ArrayList<>();
            for (Stripalbum s : stripalbums)
                stripalbumDTOs.add(convertToStripalbumDTO(s));
            return stripalbumDTOs;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("Stripreeks met id %d bestaat niet.", id));
    }

    @GetMapping("/filter")
    public Iterable<Stripalbum> findByStripreeksGenre(@RequestParam(required = false) String stripreeksgenre) {
        return stripalbumRepository.findByStripreeksGenre(stripreeksgenre);
    }

    @GetMapping("{id}")
    public StripalbumDTO read(@PathVariable int id) {
        Optional<Stripalbum> optStripalbum = stripalbumRepository.findById(id);
        if (optStripalbum.isPresent())
            return convertToStripalbumDTO(optStripalbum.get());
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Stripalbum met id %d bestaat niet", id));
    }

    @PostMapping()
    public StripalbumDTO create(@RequestBody Stripalbum stripalbum) {
        Stripalbum niewStripalbum = stripalbumRepository.save(stripalbum);
        return convertToStripalbumDTO(niewStripalbum);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable int id) {
        Optional optStripalbum = stripalbumRepository.findById(id);
        if (optStripalbum.isPresent())
            stripalbumRepository.deleteById(id);
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                String.format("Stripalbum met id %d bestaat niet.", id));
    }

    @PutMapping("{id}")
    public StripalbumDTO edit(@PathVariable int id,
                              @RequestBody Stripalbum stripalbum) {
        if (id != stripalbum.getId())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("id in url %d komt niet overeen met id van stripalbum %d", id, stripalbum.getId()));

        Optional<Stripalbum> optStripalbum = stripalbumRepository.findById(id);
        if (optStripalbum.isPresent()) {
            Stripalbum savedStripalbum = stripalbumRepository.save(stripalbum);
            return convertToStripalbumDTO(stripalbum);
        } else throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                String.format("Stripalbum met id %d bestaat niet.", id));
    }

    @GetMapping("{id}/stripreeks")
    public Stripreeks stripreeksOfStripalbum(@PathVariable int id) {
        Optional<Stripalbum> optStripalbum = stripalbumRepository.findById(id);
        if (!optStripalbum.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Stripalbum met id %d bestaat niet.", id));
        return optStripalbum.get().getStripreeks();
    }

    @PutMapping("{id}/stripreeks")
    public StripalbumDTO editStripreeksOfStripalbum(@PathVariable("id") Integer stripalbumId,
                                                    @RequestBody Integer stripreeksId) {
        Optional<Stripalbum> optStripalbum = stripalbumRepository.findById(stripalbumId);
        if (!optStripalbum.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Stripalbum met id %d bestaat niet.", stripalbumId));

        Optional<Stripreeks> optStripreeks = stripreeksRepository.findById(stripreeksId);
        if (!optStripreeks.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Stripreeks met id %d bestaat niet.", stripreeksId));
        Stripalbum stripalbum = optStripalbum.get();
        Stripreeks stripreeks = optStripreeks.get();
        stripalbum.setStripreeks(stripreeks);
        Stripalbum updatedStripalbum = stripalbumRepository.save(stripalbum);

        return convertToStripalbumDTO(updatedStripalbum);
    }

    private StripalbumDTO convertToStripalbumDTO (Stripalbum stripalbum){
        return modelMapper.map(stripalbum, StripalbumDTO.class);
    }
}
