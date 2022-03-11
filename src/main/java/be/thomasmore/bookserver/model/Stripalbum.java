package be.thomasmore.bookserver.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Stripalbum {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stripalbum_generator")
    @SequenceGenerator(name = "stripalbum_generator", sequenceName = "stripalbum_seq", allocationSize = 1)
    private int id;
    private String titel;
    private boolean kleur;
    @ManyToOne
    private Stripreeks stripreeks;
    private BigDecimal prijs;
    @ManyToMany(mappedBy="stripalbums")
    private Set<Verzamelaar> verzamelaars;

    public Stripalbum(int id){this.id=id;}
}
