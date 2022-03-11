package be.thomasmore.bookserver.model.dto;

import be.thomasmore.bookserver.model.Stripreeks;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class StripalbumDTO {
    private String titel;
    public boolean kleur;
    private Stripreeks stripreeks;
    private String info="Voor prijzen contacteer onze vertegenwoordiger.";
}
