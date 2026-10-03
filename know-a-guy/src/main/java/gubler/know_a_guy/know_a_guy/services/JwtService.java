package gubler.know_a_guy.know_a_guy.services;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import gubler.know_a_guy.know_a_guy.config.JwtProperties;
import gubler.know_a_guy.know_a_guy.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private static final String TYPE_CLAIM = "type";
    private static final String ACCESS = "access";
    private static final String REFRESH = "refresh";

    private final SecretKey key;
    private final Duration accessTtl;
    private final Duration refreshTtl;

    public JwtService(JwtProperties props) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(props.secret()));
        this.accessTtl = props.accessExpiration();
        this.refreshTtl = props.refreshExpiration();
    }


    private String build(UserEntity user, String type, Duration ttl) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(user.getUserId().toString())
            .claim(TYPE_CLAIM, type)
            .claim("role", user.getRole().name())
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(ttl)))
            .signWith(key)
            .compact();
    }


    public String generateAccessToken(UserEntity user) {
        return build(user, ACCESS, accessTtl);
    }

    public String generateRefreshToken(UserEntity user) {
        return build(user, REFRESH, refreshTtl);
    }


    private UUID parse(String token, String expectedType) {
        Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

        if (!expectedType.equals(claims.get(TYPE_CLAIM, String.class))) {
            throw new JwtException("Wrong token type");
        }

        try {
            return UUID.fromString(claims.getSubject());
        } catch (IllegalArgumentException e) {
            throw new JwtException("Invalid subject");
        }
    }

    public UUID parseAccessToken(String token) {
        return parse(token, ACCESS);
    }

    public UUID parseRefreshToken(String token) {
        return parse(token, REFRESH);
    }
}
