package gubler.know_a_guy.know_a_guy.DTOs.api;

import lombok.Value;

@Value
public class ApiResponse<T> {
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(null, data);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<T>(message, data);
    }
}
