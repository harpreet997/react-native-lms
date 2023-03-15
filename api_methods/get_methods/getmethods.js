import { baseUrl } from "../baseurl/baseurl";
import axios from "axios";

export const getEmployees = (headers) => {
    return axios.get(`${baseUrl}/api/v1/employee/list`, {headers})
}

export const getAllLeaves = () => {
    return axios.post(`${baseUrl}/api/v1/leave/list`)
}