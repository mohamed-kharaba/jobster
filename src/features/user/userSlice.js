import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import customFetch from "../../utils/axios";
import {
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
} from "./localStorage";

import {
    loginUserThunk,
    registerUserThunk,
    updateUserThunk,
} from "./userThunk";

const initialState = {
    isLoading: false,
    isSidebarOpen: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, thunkAPI) => {
        return registerUserThunk("/auth/register", user, thunkAPI);
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user, thunkAPI) => {
        return loginUserThunk("/auth/login", user, thunkAPI);
    }
);
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (user, thunkAPI) => {
        return updateUserThunk("/auth/updateUser", user, thunkAPI);
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            toast.success("Logout Successful!");
            removeUserFromLocalStorage();
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;

                addUserToLocalStorage(user);
                toast.success("User Updated");
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            });
    },
    // extraReducers: {
    //     [registerUser.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [registerUser.fulfilled]: (state, { payload }) => {
    //         const { user } = payload;
    //         state.isLoading = false;
    //         state.user = user;
    //         toast.success(`Hello There ${user.name}`);
    //     },
    //     [registerUser.rejected]: (state, { payload }) => {
    //         state.isLoading = false;
    //         toast.error(payload);
    //     },
    // },
});

export const { logoutUser, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
