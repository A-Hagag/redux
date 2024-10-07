import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await axios.post(BASE_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  }
);
// make api for getPostById Ezzat
export const getPostById = createAsyncThunk("posts/getPostById", async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});
// make api for getCommentsByPostId Ezzat
export const getCommentsByPostId = createAsyncThunk(
  "posts/getCommentsByPostId",
  async (id) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    return response.data;
  }
);
