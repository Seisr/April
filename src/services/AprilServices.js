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
    return axios.get(`${beHOST}/users/`, {
      headers: await get_header(),
    });
  },
  getAllUsersByRole: async (filter) => {
    return await axios.get(`${beHOST}/users/`, {
      headers: await get_header(),
      params: {
        filter: JSON.stringify(filter),
      },
    });
  },
  getUserById: async (id) => {
    return axios.get(`${beHOST}/users/${id}`, {
      headers: await get_header(),
    });
  },
  getUserByCodeName: async (filter) => {
    return await axios.get(`${beHOST}/users/`, {
      headers: await get_header(),
      params: {
        filter: JSON.stringify(filter),
      },
    });
  },

  postUser: async (data) => {
    return axios.post(`${beHOST}/users`, data, {
      headers: await get_header(),
    });
  },
  patchUser: async (id, data) => {
    return axios.patch(`${beHOST}/users/${id}`, data, {
      headers: await get_header(),
    });
  },
  delUser: async (id) => {
    return axios.delete(`${beHOST}/users/${id}`, {
      headers: await get_header(),
    });
  },

  // Classes

  getAllClasses: async () => {
    return await axios.get(`${beHOST}/classes`, {
      headers: await get_header(),
    });
  },
  getAllClassesByUserId: async (filter) => {
    return await axios.get(`${beHOST}/classes/`, {
      headers: await get_header(),
      params: {
        filter: JSON.stringify(filter),
      },
    });
  },
  // getUserByCodeName: async (filter) => {
  //   return await axios.get(`${beHOST}/users/`, {
  //     headers: await get_header(),
  //     params: {
  //       filter: JSON.stringify(filter),
  //     },
  //   });
  // },
  getClassesById: async (id) => {
    return axios.get(`${beHOST}/classes/${id}`, {
      headers: await get_header(),
    });
  },
  postClasses: async (data) => {
    return axios.post(`${beHOST}/classes`, data, {
      headers: await get_header(),
    });
  },
  patchClasses: async (id, data) => {
    return axios.patch(`${beHOST}/classes/${id}`, data, {
      headers: await get_header(),
    });
  },
  delClasses: async (id) => {
    return axios.delete(`${beHOST}/classes/${id}`, {
      headers: await get_header(),
    });
  },

  // Class-details

  getAllClassDetail: async () => {
    return axios.get(`${beHOST}/class-details`, {
      headers: await get_header(),
    });
  },

  getClassDetailById: async (filter) => {
    return axios.get(`${beHOST}/class-details/`, {
      headers: await get_header(),
      params: {
        filter: JSON.stringify(filter),
      },
    });
  },
  postClassDetail: async (data) => {
    return axios.post(`${beHOST}/class-details`, data, {
      headers: await get_header(),
    });
  },
  patchClassDetail: async (id, data) => {
    return axios.patch(`${beHOST}/class-details/${id}`, data, {
      headers: await get_header(),
    });
  },
  delClassDetail: async (id) => {
    return axios.delete(`${beHOST}/class-details/${id}`, {
      headers: await get_header(),
    });
  },

  // Subjects

  getAllSubjects: async () => {
    return axios.get(`${beHOST}/subjects`, {
      headers: await get_header(),
    });
  },
  getSubjectsById: async (id) => {
    return axios.get(`${beHOST}/subjects/${id}`, {
      headers: await get_header(),
    });
  },
  postSubjects: async (data) => {
    return axios.post(`${beHOST}/subjects`, data, {
      headers: await get_header(),
    });
  },
  patchSubjects: async (id, data) => {
    return axios.patch(`${beHOST}/subjects/${id}`, data, {
      headers: await get_header(),
    });
  },
  delSubjects: async (id) => {
    return axios.delete(`${beHOST}/subjects/${id}`, {
      headers: await get_header(),
    });
  },
  updateMe: async (data) => {
    return axios.patch(`${beHOST}/users/me/`, data, {
      headers: await get_header(),
    });
  },
  getMe: async () => {
    return axios.post(
      `${beHOST}/auth/verify`,
      {},
      {
        headers: await get_header(),
      }
    );
  },
  uploadImage: async (image) => {
    try {
      let formData = new FormData();
      formData.append("file", {
        uri: image.uri,
        name: `${image.uri.split("/").at(-1)}`,
        type: image.mimeType,
      });

      const response = await axios.patch(
        `${beHOST}/users/me/image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(await get_header()),
          },
        }
      );

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  },
};
