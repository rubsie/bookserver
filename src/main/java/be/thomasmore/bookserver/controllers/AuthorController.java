package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Book;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.BookDTO;
import be.thomasmore.bookserver.repositories.AuthorRepository;
import be.thomasmore.bookserver.repositories.BookRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/authors")
@Slf4j
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

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

    @ApiOperation(value = "create a new author in the database")
    @PostMapping("")
    public AuthorDTO create(@Valid @RequestBody AuthorDTO authorDto) {
        log.info("##### create author");
        if (authorRepository.findByName(authorDto.getName()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Author with name %s already exists.", authorDto.getName()));
        Author author = convertToEntity(authorDto);
        return convertToDto(authorRepository.save(author));
    }

    @ApiOperation(value = "edit an author in the database")
    @PutMapping("")
    public AuthorDTO edit(@Valid @RequestBody AuthorDTO authorDto) {
        log.info("##### edit author");
        if (!authorRepository.findAuthorById(authorDto.getId()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Author with id %s does not exists.", authorDto.getId()));
        Author author = convertToEntity(authorDto);
        return convertToDto(authorRepository.save(author));
    }

    @ApiOperation(value = "delete an existing author in the database")
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        log.info("##### delete author");
        Optional<Author> authorFromDb = authorRepository.findById(id);
        if (authorFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Author with id %s does not exists.", id));
        if (!authorFromDb.get().getBooks().isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Cannot delete author with id %s because one or more books matches with this author", id));
        authorRepository.deleteById(id);
    }


    /**
     * @param authorDto the data from client that has to be converted
     * @return the modified author entity object - ready to save in the database
     * Do not overwrite the authors-array.
     * Use the PUT request api/books/{id}/authors to update the authors for a book.
     */
    private Author convertToEntity(AuthorDTO authorDto) {
        Author author = modelMapper.map(authorDto, Author.class);
        return author;
    }

    /**
     * @param author the entity from the db
     * @return AuthorDTO object to send to the client.
     */
    private AuthorDTO convertToDto(Author author) {
        return modelMapper.map(author, AuthorDTO.class);
    }

}
