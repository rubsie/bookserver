package be.thomasmore.bookserver.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
public class Verzamelaar {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "verzamelaar_generator")
    @SequenceGenerator(name = "verzamelaar_generator", sequenceName = "verzamelaar_seq", allocationSize = 1)
    private int id;
    private String naam;
    private int broers;
    @ManyToMany
    private Collection<Stripalbum> stripalbums;
}
