import axios from 'axios';

const myApi = axios.create({
  baseURL: process.env.ML_MODEL_BASE_URL,

  timeout: 60000,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default myApi;
