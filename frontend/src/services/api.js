import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getBancos = () => api.get('/bancos');
export const getRelatos = () => api.get('/relatos');
export const postRelato = (relatoData) => api.post('/relatos', relatoData);

export default api;