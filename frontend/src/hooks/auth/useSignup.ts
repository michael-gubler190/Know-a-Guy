import { useMutation } from "@tanstack/react-query";
import type { ClientSignupRequest } from "../../models/auth/ClientSignupRequest";
import api from "../../services/api";

async function signup(signupInput : ClientSignupRequest): Promise<void> {
    await api.post("/api/v1/auth/client/signup", signupInput);
}

export function useSignup() {
    return useMutation({
        mutationFn: signup
    });
}