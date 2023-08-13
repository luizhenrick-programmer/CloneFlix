import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "6b4c0b3fbb8d9df65775da13fe2f23dd",
        language: "pt-BR",
        include_adult: "false", 
    }
});