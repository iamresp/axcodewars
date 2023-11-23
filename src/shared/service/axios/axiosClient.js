import axios from "axios";

const api = axios.create({
    baseURL: 'http://134.0.116.26:5552/api'
})

export default api