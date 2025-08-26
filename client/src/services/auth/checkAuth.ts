import axiosInstance from "@/src/apis/axiosInstance";
import { HTTP_STATUS_CODES } from "@/src/constants/constant";
import { login, logout } from "@/src/utils/auth/auth";
import { saveItem } from "@/src/utils/storage/expo_storage";

export const checkUserAuth = async ({
  userAccessToken,
}: {
  userAccessToken: string;
}) => {
  try {
    // const accessToken = await getAccessToken();

    if (!userAccessToken) {
      return;
    }
    // logout();

    const response = await axiosInstance.post(`/user/authcheck`, {
      encrypted: userAccessToken,
    });

    // console.log('checkUserAuth', data, response.status, userAccessToken);

    // return { response: data, status: response.status };
    // console.log("userAccessToken", userAccessToken);

    const data = response.data;
    // console.log("checkUserAuth", data, response.status, userAccessToken);
    if (response.status === HTTP_STATUS_CODES.OK) {
      await saveItem("session", JSON.stringify(data.user));
    } else if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      logout();
    }
    return data.user;
  } catch (error: any) {
    // console.log(error);
    if (error.response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      logout();
    }
  }
};
