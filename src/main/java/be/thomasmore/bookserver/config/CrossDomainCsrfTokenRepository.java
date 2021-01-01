package be.thomasmore.bookserver.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This class is essentially a wrapper for a cookie based CSRF protection scheme.
 * The issue with the pure cookie based mechanism is that if you deploy the UI on a different
 * domain to the API then the client is not able to read the cookie value when a new CSRF
 * token is generated (even if the cookie is not HTTP only).
 * This mechanism does the same thing, but also provides a response header so that the client
 * can read this value and the use some local mechanism to store the token
 * (local storage, local user agent DB, construct a new cookie on the UI domain etc).
 *
 * @see <a href="https://stackoverflow.com/questions/45424496/csrf-cross-domain">
 * https://stackoverflow.com/questions/45424496/csrf-cross-domain</a>
 */
@Slf4j
public class CrossDomainCsrfTokenRepository implements CsrfTokenRepository {

    public static final String XSRF_HEADER_NAME = "X-XSRF-TOKEN";
    public static final String XSRF_TOKEN_COOKIE_NAME = "XSRF-TOKEN";
    private static final String CSRF_QUERY_PARAM_NAME = "_csrf";

    private final CookieCsrfTokenRepository delegate = new CookieCsrfTokenRepository();

    public CrossDomainCsrfTokenRepository() {
        delegate.setCookieHttpOnly(true);
        delegate.setHeaderName(XSRF_HEADER_NAME);
        delegate.setCookieName(XSRF_TOKEN_COOKIE_NAME);
        delegate.setParameterName(CSRF_QUERY_PARAM_NAME);
    }

    @Override
    public CsrfToken generateToken(final HttpServletRequest request) {
        return delegate.generateToken(request);
    }

    @Override
    public void saveToken(final CsrfToken token,
                          final HttpServletRequest request,
                          final HttpServletResponse response) {
        log.info("saveToken " + (token != null ? token.getToken() : "NULL") + " -- request = " + request.getMethod() + " " + request.getRequestURI());
        delegate.saveToken(token, request, response);
        if (token != null)
            response.setHeader(XSRF_HEADER_NAME, token.getToken());
    }

    @Override
    public CsrfToken loadToken(final HttpServletRequest request) {
        return delegate.loadToken(request);
    }

}
