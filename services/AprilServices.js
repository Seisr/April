import axios from "axios";

let url = "";
export const AprilService = {
  getAllUsers: async () => {
    return axios.get(`${url}/users/`, {
      headers: await get_header(),
    });
  },
};
