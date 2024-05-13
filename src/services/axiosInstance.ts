import axios from "axios";

import { API_URL } from "config";
// const API_KEY = "a1b502e568cd76123321aaa0281300dc";
const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWI1MDJlNTY4Y2Q3NjEyMzMyMWFhYTAyODEzMDBkYyIsInN1YiI6IjY2MzhlYTE4NWE0NjkwMDEyNTNlYWQ5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X8hjq7CrFIvIm7eSGfYhdq3AnkyRKh5CVPTI1cKqicw";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`, // Include Authorization header with bearer token
  },
});

export default axiosInstance;
