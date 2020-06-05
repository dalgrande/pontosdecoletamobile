import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.28.207.253:3333'
})

export default api