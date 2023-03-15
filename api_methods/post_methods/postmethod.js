import { baseUrl } from "../baseurl/baseurl";
import axios from "axios";

export const login = (data) => {
    return axios.post(`${baseUrl}/api/v1/auth/login`, data)
}