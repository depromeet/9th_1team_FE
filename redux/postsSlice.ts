import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Post {
  balanceGameSelectionVotesCount: number;
  balanceGameSelections: any[];
  commentCount: number;
  createdAt: string;
  description: string;
  id: string;
  mySelection: string;
  status: string;
  thumbs: number;
  totalVoteCount: string;
  updatedAt: string;
  userId: string;
  __typename: string;
}

export interface VotePost {
  createVoteLogined: Post;
}

export interface PostsState {
  posts: Post[] | null;
  //value: number
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts?.concat(action.payload);
      //state.posts?.push(payload.data);
    },
    editList: (state, action: PayloadAction<VotePost>) => {
      //const targetPost = state.posts?.filter(post => post.id === action.payload.id);
      const updatedList = state.posts?.map((post) => {
        if (post.id === action.payload.createVoteLogined.id) {
          return action.payload.createVoteLogined;
        }
        return post;
      });
      state.posts = updatedList;
    },
    // addPost: (state) => {
    //   state.posts?.push({ id: 1, title: "ㅛy", content: "aaa" });
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

export const { addList, editList } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts;

export default postsSlice.reducer;
