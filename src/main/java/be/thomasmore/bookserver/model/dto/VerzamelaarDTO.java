package be.thomasmore.bookserver.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@NoArgsConstructor
@Data
public class VerzamelaarDTO {
    private String naam;
    private Collection<StripalbumDTO> stripalbums;

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class StripalbumDTO {
        private int id;
        private String titel;
    }
}
