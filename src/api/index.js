import axios from "axios";

const api = axios.create({
    // baseURL: process.env.BASE_URL
    baseURL: process.env.REACT_APP_BASE_URL
})

// axios.defaults.headers.common['X-Master-Key'] = process.env.MATER_KEY;
// axios.defaults.headers.common['X-Access-Key'] = process.env.ACCESS_KEY;


export default api