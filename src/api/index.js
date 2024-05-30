//import axios
import axios from 'axios';

const Api = axios.create({
    withCredentials: true,
    //set default endpoint API
    baseURL: 'http://localhost:8000'
})

export default Api