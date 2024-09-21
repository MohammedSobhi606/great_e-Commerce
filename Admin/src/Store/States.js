import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  token: "",
  baseurl: "http://localhost:5000",
  isLoading: false,
};
const States = createSlice({
  name: "states",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setToken, setIsLoading } = States.actions;
export default States.reducer;
