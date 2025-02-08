import axios from "axios";

const api = axios.create({
 baseURL: "https://apiplanets.vercel.app/",
});

export default api