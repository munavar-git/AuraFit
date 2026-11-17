import { createSlice } from "@reduxjs/toolkit";

const getSavedUser = () => {
    try {
        const saved = localStorage.getItem("aurafit_user");
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
};

const initialUser = getSavedUser();

const initialState = {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("aurafit_user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("aurafit_user");
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("aurafit_user", JSON.stringify(state.user));
        }
    }
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
