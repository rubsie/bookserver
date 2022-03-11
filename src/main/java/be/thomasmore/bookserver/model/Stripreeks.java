package be.thomasmore.bookserver.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
public class Stripreeks {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stripreeks_generator")
    @SequenceGenerator(name = "stripreeks_generator", sequenceName = "stripreeks_seq", allocationSize = 1)
    private int id;
    private String naam;
    private String genre;
}
