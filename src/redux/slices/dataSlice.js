import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const dataSlices = createSlice({
  name: "info",
  initialState: {
    name: "",
    email: "",
    phone: "",
    message: "",
    loading: false,
  },

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      console.log(state);
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearNow: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.message = "";
      state.loading = false;
    },
  },
});
export const { setName, setEmail, setPhone, setMessage, setLoading, clearNow } =
  dataSlices.actions;
export default dataSlices.reducer;
