import axios from "axios";

// const url = "https://memoriesdepot.cyclic.app/";
const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// export const fetchPosts = () => axios.get(url);
export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => axios.post(url, newPost);
export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}`, updatedPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

// export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const likePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}/likePost`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);