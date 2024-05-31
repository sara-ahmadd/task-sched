import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

const initialState: { user: UserType | null } = {
  user: null,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
