import axios from "axios";
export const base = "http://localhost:3001";

export default axios.create({
  baseURL: base,
});
