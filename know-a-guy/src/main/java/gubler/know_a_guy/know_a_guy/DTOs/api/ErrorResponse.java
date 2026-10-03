package gubler.know_a_guy.know_a_guy.DTOs.api;

import java.time.OffsetDateTime;

import lombok.Value;

@Value
public class ErrorResponse {
    private int status;
    private String path;
    private String message;
    private OffsetDateTime timestamp = OffsetDateTime.now();
}
