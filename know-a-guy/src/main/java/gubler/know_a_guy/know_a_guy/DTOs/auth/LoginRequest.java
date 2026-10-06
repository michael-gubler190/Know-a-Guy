package gubler.know_a_guy.know_a_guy.DTOs.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class LoginRequest {
    @NotBlank(message = "Please fill out email")
    @Email(message = "Please enter a valid email")
    private String email;

    @NotBlank(message = "Please fill out password")
    private String password;
}
