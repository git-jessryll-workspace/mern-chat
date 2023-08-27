import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "loading",
  error: "",
  user: {
    id: "",
    name: "Jessryll Quitoriano",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;