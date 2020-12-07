package be.thomasmore.bookserver.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
@Entity
public class Book {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_generator")
    @SequenceGenerator(name = "book_generator", sequenceName = "book_seq", allocationSize = 1)
    @Id
    int id;
    @NotBlank(message="Book Title should not be blank") @NotNull
    String title;
    @NotBlank(message="Book Author should not be blank") @NotNull
    String author; //this is not normalized but I don't care for this example

    @Min(value=0, message="price should not be smaller than 0")
    @Max(value=200, message="price should not be greater than 200")
    Integer priceInEur;
}

