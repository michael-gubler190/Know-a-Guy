package gubler.know_a_guy.know_a_guy.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gubler.know_a_guy.know_a_guy.DTOs.auth.ClientSignupRequest;
import gubler.know_a_guy.know_a_guy.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // Client account creation endpoint
    @PostMapping("/client/signup")
    public void clientCreateAccount(@Valid @RequestBody ClientSignupRequest clientSignupRequest) {
        authService.clientAccountCreation(clientSignupRequest);
    }
}
