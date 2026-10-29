import { useMutation } from "@tanstack/react-query";
import type { UserRep } from "../../models/users/UserRep";
import api from "../../services/api";

async function becomeProfessional(): Promise<UserRep | null> {
    const response = await api.patch("/api/v1/users/role/2");
    if (response.status == 200) {
        return response.data.data;
    }

    return null;
}

export function useBecomeProfessional() {
    return useMutation({
        mutationFn: becomeProfessional
    })
}