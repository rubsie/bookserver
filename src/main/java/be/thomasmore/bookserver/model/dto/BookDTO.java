package be.thomasmore.bookserver.model.dto;

import be.thomasmore.bookserver.model.Author;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@Data
public class BookDTO {
    private int id;
    private String title;
    private String author; //this is not normalized but I don't care for this example
    private Collection<String> authorNames;
    Integer priceInEur;
}

