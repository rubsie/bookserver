package be.thomasmore.bookserver.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Configuration
public class TomcatConfiguration {
    @Value("${books.addSameSiteToCookies:false}")
    private boolean addSameSiteToCookies;
    @Value("${books.addSecureToCookies:false}")
    private boolean addSecureToCookies;

    @Bean
    public TomcatContextCustomizer sameSiteCookiesConfig() {

        return context -> {
            if (!addSameSiteToCookies) return;

            final Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor() {
                @Override
                public String generateHeader(javax.servlet.http.Cookie cookie, HttpServletRequest request) {
                    if (addSecureToCookies)
                        cookie.setSecure(true);
                    return super.generateHeader(cookie, request);
                }
            };
            //noinspection ConstantConditions
            if (addSameSiteToCookies)
                cookieProcessor.setSameSiteCookies(SameSiteCookies.NONE.getValue());
            context.setCookieProcessor(cookieProcessor);
        };
    }

}
