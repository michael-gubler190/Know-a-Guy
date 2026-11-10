import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { Professional } from "../../models/users/Professional";

async function getAllProfessionals(): Promise<Professional[] | null> {
    const response = await api.get("/api/v1/users/professionals");
    if (response.status == 200) {
        return response.data.data;
    }

    return null;
}

export function useProfessionals() {
    return useQuery({
        queryKey: ["professionals"],
        queryFn: getAllProfessionals,
        staleTime: 1000 * 60 * 5
    })
}