import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { UserRep } from "../../../models/users/UserRep"

export interface AuthState {
    isAuthenticated: boolean
    user: UserRep | null
    isInitializing: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isInitializing: true
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserRep>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitializing = false;
        },

        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitializing = false;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsInitializing = (state: { auth: AuthState }) => state.auth.isInitializing;

export default authSlice.reducer;