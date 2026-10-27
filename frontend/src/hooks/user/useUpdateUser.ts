import { useMutation } from "@tanstack/react-query";
import type { UpdateRequest } from "../../models/users/UpdateRequest";
import api from "../../services/api";
import type { UserRep } from "../../models/users/UserRep";

async function updateUser(updateRequest: UpdateRequest): Promise<UserRep | null> {
    const response = await api.patch("/api/v1/users", updateRequest);
    if (response.status == 200) {
        return response.data.data;
    }

    return null;
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: updateUser
    });
}