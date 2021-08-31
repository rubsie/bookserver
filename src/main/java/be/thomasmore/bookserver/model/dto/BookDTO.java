package be.thomasmore.bookserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@Data
public class BookDTO {
    private int id;
    private String title;
    private String author; //this is not normalized but I don't care for this example
    private Collection<BookAuthorDTO> authors;
    Integer priceInEur;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class BookAuthorDTO {
        private int id;
        private String authorName;
    }
}

