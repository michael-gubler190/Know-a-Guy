import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";

async function logout(): Promise<void> {
    await api.post("/api/v1/auth/logout");
}

export function useLogout() {
    return useMutation({
        mutationFn: logout
    });
}