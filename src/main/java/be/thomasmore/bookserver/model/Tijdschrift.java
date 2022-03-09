package be.thomasmore.bookserver.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Tijdschrift {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tijdschrift_generator")
    @SequenceGenerator(name = "tijdschrift_generator", sequenceName = "tijdschrift_seq", allocationSize = 1)
    private long id;
    private String type;
    private String naam;
}
