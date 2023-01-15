import axios from "axios"

const axiosLogin = axios.create({
    baseURL: "https://localhost:8443/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json"
    }
    
});

export default axiosLogin;