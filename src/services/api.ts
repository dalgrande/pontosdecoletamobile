import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.API_URL}:3333`,
});

export default api;
