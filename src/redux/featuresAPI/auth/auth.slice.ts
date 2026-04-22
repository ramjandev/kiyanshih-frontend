import type { RootState } from "@/redux/store";
import type { TUser } from "@/redux/user.type";
import { createSlice } from "@reduxjs/toolkit";

type Tstate = {
  user: TUser | null;
  accessToken: string | null;
};

const initialState: Tstate = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload || {};
      if (!user || !accessToken) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      state.accessToken = accessToken;
      state.user = user;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth?.user;
export const selectToken = (state: RootState) => state.auth?.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
