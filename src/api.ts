import axios from "axios";

export const API = axios.create({
    baseURL:"http://localhost:5001/api",
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("@token")}`
    }
})