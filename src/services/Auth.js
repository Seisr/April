import axios from "axios";
import { beHOST, accessToken, user } from "../../setting";
import * as SecureStore from "expo-secure-store";

export const isAuthorzied = async () => {
  const token = await SecureStore.getItemAsync(accessToken);
  try {
    const response = await axios.post(
      `${beHOST}/auth/verify`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await SecureStore.setItemAsync(user, JSON.stringify(response.data));
    return response.status == 200;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const get_header = async () => {
  const token = await SecureStore.getItemAsync(accessToken);
  return { authorization: `Bearer ${token}` };
};
