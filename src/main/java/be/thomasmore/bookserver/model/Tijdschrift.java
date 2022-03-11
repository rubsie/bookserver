package be.thomasmore.bookserver.model;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Data
public class Tijdschrift {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tijdschrift_generator")
    @SequenceGenerator(name = "tijdschrift_generator", sequenceName = "tijdschrift_seq", allocationSize = 1)
    private long id;
    private String type;
    @NotBlank
    private String naam;
    @Min(value=1)
    private float prijs;
}
