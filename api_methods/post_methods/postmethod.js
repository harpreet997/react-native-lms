import { baseUrl } from "../baseurl/baseurl";
import axios from "axios";

export const login = (data) => {
    return axios.post(`${baseUrl}/api/v1/auth/login`, data)
}

export const applyLeave = (leavedata) => {
    return axios.post(`${baseUrl}/api/v1/leave/add`, leavedata)
} 

export const deleteLeave = (id) => {
    return axios.delete(`${baseUrl}/api/v1/leave/${id}`)
}

export const editLeave = (id,editleavedata) => {
    return axios.patch(`${baseUrl}/api/v1/leave/${id}`, editleavedata)
} 