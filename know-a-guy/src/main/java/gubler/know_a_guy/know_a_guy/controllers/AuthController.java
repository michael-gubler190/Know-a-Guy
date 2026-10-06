package gubler.know_a_guy.know_a_guy.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import gubler.know_a_guy.know_a_guy.DTOs.auth.AuthResult;
import gubler.know_a_guy.know_a_guy.DTOs.auth.ClientSignupRequest;
import gubler.know_a_guy.know_a_guy.DTOs.auth.LoginRequest;
import gubler.know_a_guy.know_a_guy.services.AuthCookieService;
import gubler.know_a_guy.know_a_guy.services.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthCookieService cookieService;

    // Client account creation endpoint
    @PostMapping("/client/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void clientCreateAccount(@Valid @RequestBody ClientSignupRequest clientSignupRequest, HttpServletResponse response) {
        AuthResult result = authService.clientAccountCreation(clientSignupRequest);
        cookieService.addAuthCookies(response, result);
    }

    // Login endpoint
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public void login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        AuthResult result = authService.login(loginRequest);
        cookieService.addAuthCookies(response, result);
    }

    // Logout endpoint
    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout(HttpServletResponse response) {
        cookieService.clear(response);
    }
}
