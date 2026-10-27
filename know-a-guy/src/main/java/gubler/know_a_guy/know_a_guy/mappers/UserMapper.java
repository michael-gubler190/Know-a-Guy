package gubler.know_a_guy.know_a_guy.mappers;

import java.util.function.Consumer;

import org.springframework.stereotype.Component;

import gubler.know_a_guy.know_a_guy.DTOs.auth.ClientSignupRequest;
import gubler.know_a_guy.know_a_guy.DTOs.user.UpdateUserRequest;
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
            user.getBio(),
            user.getEmail(),
            user.getUsername(),
            user.getRole(),
            user.getStatus(),
            user.getZip(),
            user.getCity(),
            user.getCreatedAt()
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

    public void updateEntity(UpdateUserRequest request, UserEntity user) {
        setIfPresent(request.getBio(), user::setBio);
        setIfPresent(request.getProfilePicturePath(), user::setProfilePicturePath);
        setIfPresent(request.getUsername(), user::setUsername);
        setIfPresent(request.getEmail(), user::setEmail);
        setIfPresent(request.getZip(), user::setZip);
        setIfPresent(request.getCity(), user::setCity);
    }

    private void setIfPresent(String value, Consumer<String> setter) {
        if (value != null && !value.isBlank()) {
            setter.accept(value.trim());
        }
    }
    
}
