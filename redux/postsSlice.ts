import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Post {
  id: number;
  title: string;
  content: string;
}

// Define a type for the slice state
export interface PostsState {
  posts: Post[] | null;
  //value: number
}

// Define the initial state using that type
const initialState: PostsState = {
  posts: null,
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPost: (state) => {
      state.posts?.push({ id: 1, title: "ㅛy", content: "aaa" });
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

export const { addPost } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts;

export default postsSlice.reducer;
