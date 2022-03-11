package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Stripalbum;
import be.thomasmore.bookserver.model.Verzamelaar;
import be.thomasmore.bookserver.model.dto.StripalbumDTO;
import be.thomasmore.bookserver.model.dto.VerzamelaarDTO;
import be.thomasmore.bookserver.repositories.VerzamelaarRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/verzamelaars")
public class VerzamelaarController {
    @Autowired
    private VerzamelaarRepository verzamelaarRepository;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("")
    public Iterable<VerzamelaarDTO> findAll() {
        Iterable<Verzamelaar> verzamelaars = verzamelaarRepository.findAll();
        List<VerzamelaarDTO> verzamelaarDTOs = new ArrayList<>();
        for (Verzamelaar verzamelaar : verzamelaars) {
            verzamelaarDTOs.add(convertToDto(verzamelaar));
        }
        return verzamelaarDTOs;
    }

    @GetMapping("{id}/stripalbums")
    public Iterable<StripalbumDTO> stripalbumssOfVerzamelaar(@PathVariable int id) {
        Optional<Verzamelaar> optVerzamelaar = verzamelaarRepository.findById(id);
        if (!optVerzamelaar.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Verzamelaar met id %d bestaat niet.", id));

        ArrayList<StripalbumDTO> stripalbumsOfVerzamelaar = new ArrayList<>();
        for (Stripalbum s : optVerzamelaar.get().getStripalbums())
            stripalbumsOfVerzamelaar.add(convertToDto(s));
        return stripalbumsOfVerzamelaar;
    }

    @PutMapping("{id}/stripalbums")
    public VerzamelaarDTO editStripalbumsOfVerzamelaar(@PathVariable int id,
                                                       @RequestBody Collection<Integer> stripalbumIds) {
        Optional<Verzamelaar> optVerzamelaar = verzamelaarRepository.findById(id);
        if (!optVerzamelaar.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Verzamelaar met id %d bestaat niet.", id));

        Verzamelaar verzamelaar = optVerzamelaar.get();
        ArrayList<Stripalbum> stripalbums = new ArrayList<>();
        if (stripalbumIds != null)
            for (Integer stripalbumId : stripalbumIds)
                stripalbums.add(new Stripalbum(stripalbumId));
        verzamelaar.setStripalbums(stripalbums);
        return convertToDto(verzamelaarRepository.save(verzamelaar));
    }

    private VerzamelaarDTO convertToDto(Verzamelaar verzamelaar) {
        return modelMapper.map(verzamelaar, VerzamelaarDTO.class);
    }

    private StripalbumDTO convertToDto(Stripalbum stripalbum) {
        return modelMapper.map(stripalbum, StripalbumDTO.class);
    }
}
