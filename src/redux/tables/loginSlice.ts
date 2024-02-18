import { createSlice } from "@reduxjs/toolkit";

interface ILoginForm {
  user: { name: string; email: string; password: string };
  showPassword: boolean;
}

const initialState: ILoginForm = {
  user: { name: "", email: "", password: "" },
  showPassword: false,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setName(state, action) {
      state.user.name = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setPassword(state, action) {
      state.user.password = action.payload;
    },
    setShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    cleanUser(state) {
      state.user = { name: "", email: "", password: "" };
    },
  },
});

export const { setName, setEmail, setPassword, setShowPassword, cleanUser } =
  loginSlice.actions;

export default loginSlice.reducer;
