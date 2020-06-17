import axios from "axios";

const api = axios.create({
  baseURL: "http://servermarket.unifacex.com.br/"
});

export default api;
