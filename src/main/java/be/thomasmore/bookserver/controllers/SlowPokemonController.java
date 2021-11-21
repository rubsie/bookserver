package be.thomasmore.bookserver.controllers;

import be.thomasmore.bookserver.services.GenreService;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static java.lang.Thread.sleep;

@RestController
@RequestMapping("/api/slowpokemon")
@Slf4j
public class SlowPokemonController {
    @Autowired
    GenreService genreService;

    @ApiOperation(value = "demo for slow response to use in pokemon app. ",
            notes = "Returns just enough dummy info so that it can be used in pokemon app. </br>" +
                    "it sleeps 5 seconds before it responds. ")
    @CrossOrigin
    @GetMapping("{id}")
    public String findOne(@PathVariable int id) {
        log.info(String.format("##### Pokemon findOne with id %d", id));
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        final String s = String.format("{" +
                "\"id\": %d, " +
                "\"name\":\"Slow Pokemon\"," +
                "\"types\":[{" +
                "\"type\": {" +
                "\"name\": \"normal\"" +
                "}" +
                "}], " +
                "\"sprites\":{" +
                "\"other\": {" +
                "\"official-artwork\": {" +
                "\"front_default\": \"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/289.png\"" +
                "}" +
                "}" +
                "}" +
                "}", id);
        log.info(String.format("##### Pokemon findOne returns %s", s));
        return s;
    }

    @ApiOperation(value = "demo for slow response to use in pokemon app. ",
            notes = "Throws exception. </br>" +
                    "it sleeps 5 seconds before it does. ")
    @CrossOrigin
    @GetMapping("ERROR/{id}")
    public String findOneWithException(@PathVariable int id) {
        log.info(String.format("##### Pokemon findOneWithException with id %d with exception", id));
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("##### Pokemon findOneWithException throws NOW");
        throw new RuntimeException("DUMMY POKEMON EXCEPTION");
    }

}
