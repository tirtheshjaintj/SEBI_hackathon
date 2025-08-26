import axiosInstance from "@/src/apis/axiosInstance";

export const createUser = async ({ tokenId }: { tokenId: string }) => {
  try {
    const response = await axiosInstance.post(`/user/google`, {
      tokenId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const sendNotification = async (data: { email: string, name: string, deviceInfo: any }) => {
  try {
    const response = await axiosInstance.post(`/user/notify`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};