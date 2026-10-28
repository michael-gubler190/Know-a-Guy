package gubler.know_a_guy.know_a_guy.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gubler.know_a_guy.know_a_guy.DTOs.user.UpdateUserRequest;
import gubler.know_a_guy.know_a_guy.DTOs.user.UserResponseDto;
import gubler.know_a_guy.know_a_guy.entities.UserEntity;
import gubler.know_a_guy.know_a_guy.enums.users.UserRole;
import gubler.know_a_guy.know_a_guy.exceptions.ConflictException;
import gubler.know_a_guy.know_a_guy.exceptions.ResourceNotFoundException;
import gubler.know_a_guy.know_a_guy.exceptions.ValidationException;
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


    // Update user role to professional
    @Transactional
    public UserResponseDto becomeProfessional(String currentUserEmail) {
        // Get logged in user
        UserEntity currentUser = userRepository
            .findByEmail(currentUserEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Could not find user with that email"));

        // Check if user meets requirements to become a pro (User is currently a client and all fields not null or blank)
        if (currentUser.getRole() != UserRole.client) {
            throw new ConflictException("Only client accounts can become professionals");
        }

        List<String> missingFields = findMissingProfileFields(currentUser);
        if (!missingFields.isEmpty()) {
            throw new ValidationException("Complete your profile before becoming a professional. Missing: " + String.join(", ", missingFields));
        }

        // Update user role to professional
        currentUser.setRole(UserRole.professional);

        UserEntity result = userRepository.save(currentUser);

        return userMapper.toResponse(result);
    }

    private List<String> findMissingProfileFields(UserEntity user) {
        List<String> missing = new ArrayList<>();
        if (isBlank(user.getFirstName())) missing.add("firstName");
        if (isBlank(user.getLastName())) missing.add("lastName");
        if (isBlank(user.getProfilePicturePath())) missing.add("profilePicturePath");
        if (isBlank(user.getBio())) missing.add("bio");
        if (isBlank(user.getEmail())) missing.add("email");
        if (isBlank(user.getUsername())) missing.add("username");
        if (isBlank(user.getZip())) missing.add("zip");
        if (isBlank(user.getCity())) missing.add("city");
        return missing;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
