package be.thomasmore.bookserver.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Collection;

@NoArgsConstructor
@Data //maakt zelf alle getters en setters op de achtergrond
@Entity
@AllArgsConstructor //maakt het creeren van een constructor in de class overbodig
public class Book {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_generator")
    @SequenceGenerator(name = "book_generator", sequenceName = "book_seq", allocationSize = 1)
    @Id
    //private int id;
    public int id;
    @NotBlank(message = "Book Title should not be blank")
    @NotNull
    private String title;

    //todo: clean up (with flyway)
    private String author = ""; //this is not normalized but I don't care for this example

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Author> authors;

    @ManyToMany(fetch = FetchType.LAZY)
    private Collection<Genre> genres;

    @Min(value = 0, message = "price should not be smaller than 0")
    @Max(value = 200, message = "price should not be greater than 200")
    Integer priceInEur;
    @Size(min = 10, message = "An ISBN number is minimal 10 characters long")
    @Size(max = 13, message = "An ISBN number is maximal 13 characters long")
    String ISBN;
}

