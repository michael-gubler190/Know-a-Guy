package gubler.know_a_guy.know_a_guy.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gubler.know_a_guy.know_a_guy.DTOs.user.UpdateUserRequest;
import gubler.know_a_guy.know_a_guy.DTOs.user.UserResponseDto;
import gubler.know_a_guy.know_a_guy.entities.UserEntity;
import gubler.know_a_guy.know_a_guy.exceptions.ResourceNotFoundException;
import gubler.know_a_guy.know_a_guy.mappers.UserMapper;
import gubler.know_a_guy.know_a_guy.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;


    // Update user profile
    @Transactional
    public UserResponseDto updateUser(String currentUserEmail, UpdateUserRequest updateUserRequest) {
        // Get logged in user
        UserEntity currentUser = userRepository
            .findByEmail(currentUserEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Could not find user with that email"));
        
        // Updated any fields that are not blank or null
        userMapper.updateEntity(updateUserRequest, currentUser);
        UserEntity resultUser = userRepository.save(currentUser);

        return userMapper.toResponse(resultUser);
    }
}
