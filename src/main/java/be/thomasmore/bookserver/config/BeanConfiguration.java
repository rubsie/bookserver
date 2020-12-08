package be.thomasmore.bookserver.config;

import be.thomasmore.bookserver.services.GenreService;
import be.thomasmore.bookserver.services.GenreServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    GenreService getGenreService() {
        return new GenreServiceImpl();
    }
}
