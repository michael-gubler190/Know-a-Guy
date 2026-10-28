package gubler.know_a_guy.know_a_guy.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gubler.know_a_guy.know_a_guy.DTOs.api.ApiResponse;
import gubler.know_a_guy.know_a_guy.DTOs.user.UpdateUserRequest;
import gubler.know_a_guy.know_a_guy.DTOs.user.UserResponseDto;
import gubler.know_a_guy.know_a_guy.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // Update user profile
    @PatchMapping
    public ResponseEntity<ApiResponse<UserResponseDto>> updateUser(@AuthenticationPrincipal UserDetails currentUser, @RequestBody @Valid UpdateUserRequest updateUserRequest) {
        String currentUserEmail = currentUser.getUsername();
        UserResponseDto response = userService.updateUser(currentUserEmail, updateUserRequest);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Successfully updated user", response));
    }


    // Update user's role to professional
    @PatchMapping("/role/2")
    public ResponseEntity<ApiResponse<UserResponseDto>> becomeProfessional(@AuthenticationPrincipal UserDetails currentUser) {
        String currentUserEmail = currentUser.getUsername();
        UserResponseDto response = userService.becomeProfessional(currentUserEmail);

        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ApiResponse.success("Successfully updated user role", response));
    }
}
