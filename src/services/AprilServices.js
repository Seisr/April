import axios from "axios";
import { beHOST } from "../../setting";
import { get_header } from "./Auth";

export const AprilService = {
  login: async (email, password) => {
    return await axios.post(`${beHOST}/auth/login`, { email, password });
  },
  forgotPassword: async (email) => {
    return await axios.post(`${beHOST}/auth/forgot-password`, { email });
  },

  getAllUsers: async () => {
    return axios.get(`${url}/users/`, {
      headers: await get_header(),
    });
  },
  getUserById: async (id) => {
    return axios.get(`${url}/users/${id}`, {
      headers: await get_header(),
    });
  },
  postUser: async (data) => {
    return axios.post(`${url}/users`, data, {
      headers: await get_header(),
    });
  },
  patchUser: async (data) => {
    return axios.patch(`${url}/users`, data, {
      headers: await get_header(),
    });
  },
  delUser: async (id) => {
    return axios.delete(`${url}/users/${id}`, {
      headers: await get_header(),
    });
  },

  // Classes

  getAllClasses: async () => {
    return axios.get(`${url}/classes`, {
      headers: await get_header(),
    });
  },
  getClassesById: async (id) => {
    return axios.get(`${url}/classes/${id}`, {
      headers: await get_header(),
    });
  },
  postClasses: async (data) => {
    return axios.post(`${url}/classes`, data, {
      headers: await get_header(),
    });
  },
  patchClasses: async (data) => {
    return axios.patch(`${url}/classes`, data, {
      headers: await get_header(),
    });
  },
  delClasses: async (id) => {
    return axios.delete(`${url}/classes/${id}`, {
      headers: await get_header(),
    });
  },

  // Class-details

  getAllClassDetail: () => {
    return axios.get(`${url}/class-details`, {
      headers: await get_header(),
    });
  },

  getClassDetailById: async (id) => {
    return axios.get(`${url}/class-details/${id}`, {
      headers: await get_header(),
    });
  },
  postClassDetail: async (data) => {
    return axios.post(`${url}/class-details`, data, {
      headers: await get_header(),
    });
  },
  patchClassDetail: async (data) => {
    return axios.patch(`${url}/class-details`, data, {
      headers: await get_header(),
    });
  },
  delClassDetail: async () => {
    return axios.delete(`${url}/class-details/${id}`, {
      headers: await get_header(),
    });
  },

  // Subjects

  getAllSubjects: async () => {
    return axios.get(`${url}/subjects`, {
      headers: await get_header(),
    });
  },
  getSubjectsById: async (id) => {
    return axios.get(`${url}/subjects/${id}`, {
      headers: await get_header(),
    });
  },
  postSubjects: async (data) => {
    return axios.post(`${url}/subjects`, data, {
      headers: await get_header(),
    });
  },
  patchSubjects: async (data) => {
    return axios.patch(`${url}/subjects`, data, {
      headers: await get_header(),
    });
  },
  delSubjects: async (id) => {
    return axios.delete(`${url}/subjects/${id}`, {
      headers: await get_header(),
    });
  },
};
