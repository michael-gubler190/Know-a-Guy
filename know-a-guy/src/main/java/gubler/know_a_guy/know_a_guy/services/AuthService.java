package gubler.know_a_guy.know_a_guy.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gubler.know_a_guy.know_a_guy.DTOs.auth.AuthResult;
import gubler.know_a_guy.know_a_guy.DTOs.auth.ClientSignupRequest;
import gubler.know_a_guy.know_a_guy.entities.UserEntity;
import gubler.know_a_guy.know_a_guy.enums.users.UserRole;
import gubler.know_a_guy.know_a_guy.enums.users.UserStatus;
import gubler.know_a_guy.know_a_guy.exceptions.ConflictException;
import gubler.know_a_guy.know_a_guy.exceptions.ValidationException;
import gubler.know_a_guy.know_a_guy.mappers.UserMapper;
import gubler.know_a_guy.know_a_guy.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Client account creation
    @Transactional
    public AuthResult clientAccountCreation(ClientSignupRequest clientSignupRequest) {
        // Check if user with email or username already exist
        Boolean existsByEmail = userRepository.existsByEmail(clientSignupRequest.getEmail());
        Boolean existsByUsername = userRepository.existsByUsername(clientSignupRequest.getUsername());
        
        if (existsByEmail) 
            throw new ConflictException("A user with this email already exists.");
        
        if (existsByUsername) 
            throw new ConflictException("A user with this username already exists.");


        // Check if passwords don't match
        if (!clientSignupRequest.getPassword().equals(clientSignupRequest.getConfirmPassword())) 
            throw new ValidationException("Passwords should match");


        // Generate hashed password
        String hashedPassword = passwordEncoder.encode(clientSignupRequest.getPassword());


        // Construct user entity to save
        UserEntity newUser = userMapper.toEntity(clientSignupRequest);
        newUser.setPasswordHash(hashedPassword);
        newUser.setRole(UserRole.client);
        newUser.setStatus(UserStatus.active);

        UserEntity saved = userRepository.save(newUser);


        // Return auth result to controller
        AuthResult result = new AuthResult(
            jwtService.generateAccessToken(saved),
            jwtService.generateRefreshToken(saved),
            userMapper.toResponse(saved));

        return result;
    }
}
