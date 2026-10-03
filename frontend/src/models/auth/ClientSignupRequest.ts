export interface ClientSignupRequest {
    firstName: string,
    lastName: string | undefined,
    email: string,
    username: string | undefined,
    password: string,
    confirmPassword: string
}