import axios from "axios";

const instance = axios.create({
  baseURL: "http://20.121.123.66/api/",
});
export default instance;
