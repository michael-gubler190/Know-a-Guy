package gubler.know_a_guy.know_a_guy.DTOs.auth;

import gubler.know_a_guy.know_a_guy.DTOs.user.UserResponseDto;
import lombok.Value;

@Value
public class AuthResult {
    private String accessToken;
    private String refreshToken;
    private UserResponseDto userResponse;
}
