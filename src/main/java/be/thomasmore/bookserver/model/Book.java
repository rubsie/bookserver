package be.thomasmore.bookserver.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Collection;

@NoArgsConstructor
@Data //maakt zelf alle getters en setters op de achtergrond
@Entity
@AllArgsConstructor //maakt het creeren van een constructor in de class overbodig
public class Book {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_generator")
    @SequenceGenerator(name = "book_generator", sequenceName = "book_seq", allocationSize = 1)
    @Id
    private int id;
    @NotBlank(message="Book Title should not be blank") @NotNull
    private String title;

    //todo: clean up (with flyway)
    private String author = ""; //this is not normalized but I don't care for this example

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Author> authors;

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Genre> genres;

    @Min(value=0, message="price should not be smaller than 0")
    @Max(value=200, message="price should not be greater than 200")
    Integer priceInEur;
}

