package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.model.Author;
import be.thomasmore.bookserver.model.Genre;
import be.thomasmore.bookserver.model.dto.AuthorDTO;
import be.thomasmore.bookserver.model.dto.GenreDTO;
import be.thomasmore.bookserver.repositories.GenreRepository;
import be.thomasmore.bookserver.services.GenreService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/genres")
@Slf4j
public class GenreController {
    @Autowired
    GenreService genreService;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private ModelMapper modelMapper;

    @ApiOperation(value = "find all the genres that are stored in the database")
    @GetMapping("")
    public Iterable<GenreDTO> findAll() {
        log.info("##### findAll Genres");
        final Iterable<Genre> genres = genreRepository.findAll();
        ArrayList<GenreDTO> genreDTO = new ArrayList<>();
        for (Genre g : genres) genreDTO.add(convertToDto(g));
        return genreDTO;
    }

    @GetMapping("{id}")
    public Genre read(@PathVariable int id) {
        log.info("##### read genre -- id=" + id);
        Optional<Genre> optGenre = genreService.findById(id);
        if(optGenre.isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with id %d does not exist.", id));
        return optGenre.get();
    }

    @ApiOperation(value = "create a new genre in the database")
    @PostMapping("")
    public GenreDTO create(@Valid @RequestBody GenreDTO genreDTO){
        log.info("##### create genre");
        if (genreRepository.findByName(genreDTO.getName()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with name %s already exists.", genreDTO.getName()));
        Genre genre = convertToEntity(genreDTO);
        return convertToDto(genreRepository.save(genre));
    }

    @ApiOperation(value = "update an existing genre in the database")
    @PutMapping("")
    public GenreDTO edit(@Valid @RequestBody GenreDTO genreDto){
        log.info("##### edit genre");
        if (!genreRepository.findGenreById(genreDto.getId()).isPresent())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with id %s does not exists.", genreDto.getId()));
        Genre genre = convertToEntity(genreDto);
        return convertToDto(genreRepository.save(genre));
    }

    @ApiOperation(value = "delete an existing genre in the database")
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id){
        log.info("##### delete genre");
        Optional<Genre> genreFromDb = genreRepository.findById(id);
        if (genreFromDb.isEmpty())
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    String.format("Genre with id %s does not exists.", id));
        genreRepository.deleteById(id);
    }

    /**
     * @param genreDTO the data from client that has to be converted
     * @return the modified genre entity object - ready to save in the database
     * Do not overwrite the genres-array.
     * Use the PUT request api/books/{id}/genres to update the genre for a book.
     */
    private Genre convertToEntity(GenreDTO genreDTO) {
        Genre genre = modelMapper.map(genreDTO, Genre.class);
        return genre;
    }

    /**
     * @param genre the entity from the db
     * @return GenreDTO object to send to the client.
     */
    private GenreDTO convertToDto(Genre genre) {
        return modelMapper.map(genre, GenreDTO.class);
    }
}
