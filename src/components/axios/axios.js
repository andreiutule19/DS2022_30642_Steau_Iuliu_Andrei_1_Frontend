import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://localhost:8443/",
    headers: {
            "Content-Type": "application/json",
            Authorization:'Bearer ' + localStorage.getItem("token")
          
        
    }
});

export default axiosInstance;