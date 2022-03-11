package be.thomasmore.bookserver.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
public class Stripalbum {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stripalbum_generator")
    @SequenceGenerator(name = "stripalbum_generator", sequenceName = "stripalbum_seq", allocationSize = 1)
    private int id;
    private String titel;
    private boolean kleur;
    @ManyToOne()
    private Stripreeks stripreeks;
    private BigDecimal prijs;
}
