import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//   AUTH
export const signUp = (newUser) => API.post("/auth/signUp/", newUser);
export const signIn = (newUser) => API.post("/auth/signIn/", newUser);
