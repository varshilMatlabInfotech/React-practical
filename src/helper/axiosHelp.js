import axios from "../../node_modules/axios/index";


const API = axios.create({
    baseURL: 'https://api.github.com'
})

API.interceptors.request.use((req) => {
    return req
}, (error) => {
    Promise.reject(error)
})

API.interceptors.response.use((res) => {
    return res
}, (error) => {
    Promise.reject(error)
})

export default API