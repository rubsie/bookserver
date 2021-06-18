package be.thomasmore.bookserver.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/authenticate")
@Slf4j
public class AuthenticationController {

    @GetMapping("")
    public AuthenticationBean authenticate(Principal principal) {
        log.info("##### authenticate");
        return new AuthenticationBean(principal.getName());
    }

    @Data
    @AllArgsConstructor
    class AuthenticationBean {
        private String username;
    }

}
