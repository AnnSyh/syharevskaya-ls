import axios from "axios";

axios.defaults.baseURL = "https://webdev-api.loftschool.com"

const  token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers["Authorizations"] = `Bearer ${token}`;
}

export default axios;
