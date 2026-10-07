import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "../../models/auth/LoginRequest";
import api from "../../services/api";
import type { UserRep } from "../../models/users/UserRep";

async function login(loginRequest : LoginRequest): Promise<UserRep | null> {
    const response = await api.post("/api/v1/auth/login", loginRequest);
    if (response.status == 200) {
        return response.data.data;
    }

    return null;
}

export function useLogin() {
    return useMutation({
        mutationFn: login
    });
}