import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { UserRep } from "../../models/users/UserRep";

async function getMe(): Promise<UserRep | null> {
    const response = await api.get("/api/v1/auth/me");
    if (response.status == 200) {
        return response.data.data;
    }

    return null;
}

export function useMe() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });
}