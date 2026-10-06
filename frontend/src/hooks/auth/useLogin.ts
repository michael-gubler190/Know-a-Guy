import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "../../models/auth/LoginRequest";
import api from "../../services/api";

async function login(loginRequest : LoginRequest): Promise<void> {
    await api.post("/api/v1/auth/login", loginRequest);
}

export function useLogin() {
    return useMutation({
        mutationFn: login
    });
}