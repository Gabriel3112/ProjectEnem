import axios from 'axios';

const api = axios.create({
  baseURL: 'http://projectenem-com-br.umbler.net/api',
});

export default api;