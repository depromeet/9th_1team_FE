import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { postsSlice, PostsState } from "./postsSlice";

export interface State {
  posts: PostsState;
}

export const rootReducer = (state: State | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE");
      return action.payload;

    default: {
      const combineReducer = combineReducers({
        posts: postsSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};
