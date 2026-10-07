package gubler.know_a_guy.know_a_guy.DTOs.user;

import java.util.UUID;

import gubler.know_a_guy.know_a_guy.enums.users.UserRole;
import gubler.know_a_guy.know_a_guy.enums.users.UserStatus;
import lombok.Value;

@Value
public class UserResponseDto {
    private UUID userId;
    private String firstName;
    private String lastName;
    private String profilePicturePath;
    private String email;
    private String username;
    private UserRole role;
    private UserStatus status;
    private String zip;
    private String city;
}
