package be.thomasmore.bookserver.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    /**
     * Try this in the browser (GET-Request):
     * http://localhost:8080/api/genre : only possible if user is logged in
     * http://localhost:8080/api/authenticate :  only possible if user is logged in
     * http://localhost:8080/api/logging : always possible (because it is a GET)
     * http://localhost:8080/api/books :  always possible (because it is a GET)
     * POST/PUT/DELETE only possible if user is logged in
     * http://localhost:8080/staticpage.html : always possible
     * because--  every url that does not start with /api is always possible (eg: everything under static)
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.csrf().disable(); DOE DIT ZEKER NIET!!!!
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        http.authorizeRequests().antMatchers("/api/genre/**").authenticated();
        http.authorizeRequests().antMatchers("/api/authenticate/**").authenticated();
        http.authorizeRequests().antMatchers("/api/signup/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/**").permitAll();
        http.authorizeRequests().antMatchers("/api/**").authenticated();
        http.authorizeRequests().anyRequest().permitAll();
        http.httpBasic();
        //http.formLogin();
        http.csrf().ignoringAntMatchers("/h2-console/**");
        http.headers().frameOptions().sameOrigin();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery(
                        "select username,password,true from booksuser where username = ?")
                .authoritiesByUsernameQuery(
                        "select username, role from booksuser where username = ?");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean()
            throws Exception {
        return super.authenticationManagerBean();
    }
}


