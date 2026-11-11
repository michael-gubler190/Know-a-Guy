import { useQuery } from "@tanstack/react-query";
import type { Professional } from "../../models/users/Professional";
import api from "../../services/api";

async function getProfessionalById(professional: string): Promise<Professional | null> {
    const response = await api.get(`/api/v1/users/professionals/${professional}`);
    return response.data.data;
}

export function useProfessional(proId: string | undefined) {
    return useQuery({
        queryKey: ["professional", proId],
        queryFn: () => getProfessionalById(proId!),
        staleTime: 1000 * 60 * 10
    });
}