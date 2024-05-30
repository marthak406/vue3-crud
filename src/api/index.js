//import axios
import axios from 'axios';

const Api = axios.create({
    withCredentials: true,
    //set default endpoint API
    baseURL: 'http://localhost:8000'
})

Api.interceptors.request.use(config => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default Api