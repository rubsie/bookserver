package be.thomasmore.bookserver.config;

import org.springframework.beans.factory.annotation.Autowired;
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

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    /*@Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.csrf().disable(); //DOE DIT ZEKER NIET!!!!
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        http.authorizeRequests().antMatchers("/api/genres/**").authenticated();
        http.authorizeRequests().antMatchers("/api/authenticate/**").authenticated();
        http.authorizeRequests().antMatchers("/api/signup/**").permitAll();
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/**").permitAll();
        http.authorizeRequests().antMatchers("/api/**").authenticated();
        http.authorizeRequests().anyRequest().permitAll();
        http.httpBasic();
        //http.formLogin();
        http.csrf().ignoringAntMatchers("/h2-console/**");
        http.headers().frameOptions().sameOrigin();
    }*/

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.csrf().disable(); //DOE DIT ZEKER NIET!!!!
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        http.authorizeRequests().antMatchers("/api/genres/**").authenticated();
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


