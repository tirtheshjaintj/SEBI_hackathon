import axios from "axios";
import { getSession } from "../utils/auth/auth";
import { BASE_URL } from "../utils/baseUrl";
import { decrypt, encrypt } from "../utils/encryption/aes";
import { getSavedItem } from "../utils/storage/async_storage";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const language = await getSavedItem("locale");
    const accessToken = session?.accessToken;
    //@ts-ignore
    if (config.data && (config.headers["Content-Type"]) != "multipart/form-data") {
      config.data = { encrypted: encrypt(config.data) };
    }
    config.headers["authorization"] = `Bearer ${accessToken}`;
    config.headers["language"] = language ?? "en";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => {
  if (response.data?.encrypted) {
    response.data = decrypt(response.data.encrypted);
  }
  return response;
});

export default axiosInstance;
