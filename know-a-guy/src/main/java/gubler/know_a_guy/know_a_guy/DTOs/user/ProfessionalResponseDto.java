package gubler.know_a_guy.know_a_guy.DTOs.user;

import java.util.UUID;

import lombok.Value;

@Value
public class ProfessionalResponseDto {
    private UUID proId;
    private String firstName;
    private String lastName;
    private String profilePicturePath;
    private String bio;
    private String username;
    private String zip;
    private String city;
}
