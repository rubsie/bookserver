package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDTO;
import be.thomasmore.bookserver.repositories.AuthorRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/authors")
@Slf4j
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ApiOperation(value = "find all the authors that are stored in the database ")
    @GetMapping("")
    public Iterable<AuthorDTO> findAll() {
        log.info("##### findAll authors");
        final Iterable<Author> authors = authorRepository.findAll();
        ArrayList<AuthorDTO> authorDTO = new ArrayList<>();
        for (Author a : authors) authorDTO.add(convertToDto(a));
        return authorDTO;
    }

    /**
     * @param author the entity from the db
     * @return AuthorDTO object to send to the client.
     */
    private AuthorDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDTO.class);
    }

}
