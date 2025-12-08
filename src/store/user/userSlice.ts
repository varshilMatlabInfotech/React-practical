import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./types";
import { toast } from "sonner";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitData: (state, action) => {
      state.data = action.payload;
    },
    bookmarkCheck: (state, action) => {
      if (action?.payload?.id) {
        state.data = state?.data?.map((item) =>
          item?.id === action?.payload?.id
            ? { ...item, is_book_mark: true }
            : item
        );
        toast.success("User successfully bookmarked");
      } else {
        toast.success("Something Went Wrong! Please try again");
      }
    },
    bookmarkUncheck: (state, action) => {
      if (action?.payload?.id) {
        state.data = state?.data?.map((item) =>
          item?.id === action?.payload?.id
            ? { ...item, is_book_mark: false }
            : item
        );
        toast.success("User successfully unbookmark");
      } else {
        toast.success("Something Went Wrong! Please try again");
      }
    },
  },
});

export const { setInitData, bookmarkCheck, bookmarkUncheck } =
  userSlice.actions;
export default userSlice.reducer;
