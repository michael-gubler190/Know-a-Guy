package gubler.know_a_guy.know_a_guy.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import gubler.know_a_guy.know_a_guy.DTOs.auth.AuthResult;
import gubler.know_a_guy.know_a_guy.config.JwtProperties;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthCookieService {
    public static final String ACCESS_COOKIE = "access_token";
    public static final String REFRESH_COOKIE = "refresh_token";
    private static final String REFRESH_PATH = "/api/v1/auth/refresh";

    private final JwtProperties jwt;
    private final boolean secure;
    private final String sameSite;

    public AuthCookieService(JwtProperties jwt, @Value("${app.cookie.secure}") boolean secure, @Value("${app.cookie.same-site}") String sameSite) {
        this.jwt = jwt;
        this.secure = secure;
        this.sameSite = sameSite;
    }


    private void add(HttpServletResponse response, String name, String value, String path, long maxAgeSeconds) {
        ResponseCookie cookie = ResponseCookie.from(name, value)
            .httpOnly(true)
            .secure(secure)
            .sameSite(sameSite)
            .path(path)
            .maxAge(maxAgeSeconds)
            .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public void addAuthCookies(HttpServletResponse response, AuthResult result) {
        add(response, ACCESS_COOKIE, result.getAccessToken(), "/", jwt.accessExpiration().toSeconds());
        add(response, REFRESH_COOKIE, result.getRefreshToken(), REFRESH_PATH, jwt.refreshExpiration().toSeconds());
    }

    public void clear(HttpServletResponse response) {
        add(response, ACCESS_COOKIE, "", "/", 0);
        add(response, REFRESH_COOKIE, "", REFRESH_PATH, 0);
    }
}
