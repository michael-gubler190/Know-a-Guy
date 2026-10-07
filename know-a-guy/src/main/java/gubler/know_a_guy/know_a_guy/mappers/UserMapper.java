package gubler.know_a_guy.know_a_guy.mappers;

import org.springframework.stereotype.Component;

import gubler.know_a_guy.know_a_guy.DTOs.auth.ClientSignupRequest;
import gubler.know_a_guy.know_a_guy.DTOs.user.UserResponseDto;
import gubler.know_a_guy.know_a_guy.entities.UserEntity;

@Component
public class UserMapper {
    public UserResponseDto toResponse(UserEntity user) {
        return new UserResponseDto(
            user.getUserId(),
            user.getFirstName(),
            user.getLastName(),
            user.getProfilePicturePath(),
            user.getEmail(),
            user.getUsername(),
            user.getRole(),
            user.getStatus(),
            user.getZip(),
            user.getCity()
        );
    }

    public UserEntity toEntity(ClientSignupRequest clientSignupRequest) {
        UserEntity user = new UserEntity();

        user.setFirstName(clientSignupRequest.getFirstName());
        user.setLastName(clientSignupRequest.getLastName());
        user.setEmail(clientSignupRequest.getEmail());
        user.setUsername(clientSignupRequest.getUsername());

        return user;
    }
}
