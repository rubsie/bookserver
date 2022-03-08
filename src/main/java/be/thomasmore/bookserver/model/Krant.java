package be.thomasmore.bookserver.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Krant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "krant_generator")
    @SequenceGenerator(name = "krant_generator", sequenceName = "krant_seq", allocationSize = 1)
    private int id;
    private String naam;
    private long oplage;
}
