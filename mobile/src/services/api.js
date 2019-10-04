import axios from 'axios';

const api = axios.create({
    // No android não funciona o localhost, colocar o Ip
    baseURL: 'http://localhost:3333',
});

export default api;