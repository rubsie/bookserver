package be.thomasmore.bookserver.config;

import be.thomasmore.bookserver.services.GenreService;
import be.thomasmore.bookserver.services.GenreServiceImpl;
import be.thomasmore.bookserver.services.TijdschriftService;
import be.thomasmore.bookserver.services.TijdschriftServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    GenreService getGenreService() {
        return new GenreServiceImpl();
    }

    @Bean
    public ModelMapper modelMapper() {
        final ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        return modelMapper;
    }
}
