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
  mySelection: string;
}

export interface PostsState {
  posts: Post[] | null;
  isPrevPageWrite: boolean;
}

const initialState: PostsState = {
  posts: [],
  isPrevPageWrite: false,
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
      const updatedList = state.posts?.map((post) => {
        if (post.id === action.payload.createVoteLogined.id) {
          const newPost = action.payload.createVoteLogined;

          // createVote시 mySelection: null로 응답돼서, 따로 상태관리 필요
          newPost["mySelection"] = action.payload.mySelection;
          return newPost;
        }
        return post;
      });
      state.posts = updatedList;
    },
    changePrevPageWrite: (state, action: PayloadAction<boolean>) => {
      state.isPrevPageWrite = action.payload;
    },
  },
});

export const { addList, editList, changePrevPageWrite } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.posts;

export default postsSlice.reducer;
