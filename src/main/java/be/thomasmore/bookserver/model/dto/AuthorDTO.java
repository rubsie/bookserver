package be.thomasmore.bookserver.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AuthorDTO {
    private int id;
    private String name;
}
