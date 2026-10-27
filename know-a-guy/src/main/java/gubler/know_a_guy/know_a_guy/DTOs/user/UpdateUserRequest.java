package gubler.know_a_guy.know_a_guy.DTOs.user;

import lombok.Value;

@Value 
public class UpdateUserRequest {
    private String username;
    private String email;
    private String profilePicturePath;
    private String bio;
    private String zip;
    private String city;
}
