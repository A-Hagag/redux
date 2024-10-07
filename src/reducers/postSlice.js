import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  deletePost,
  addPost,
  updatePost,
  getPostById, // Import the new thunk Ezzat
  getCommentsByPostId, // Import the new thunk Ezzat
} from "../APIs/postsApis";

export const postSlice = createSlice({
  name: "posts",

  initialState: {
    posts: [],
    selectedPost: null,
    comments: [], // Add comments array to state Ezzat
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
    });

    // Case for getting a post by ID Ezzat
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });

    // Add case for getting comments by post ID Ezzat
    builder.addCase(getCommentsByPostId.fulfilled, (state, action) => {
      state.comments = action.payload; // Store comments in state
    });
  },
});

export default postSlice.reducer;
