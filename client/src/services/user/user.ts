import axiosInstance from "@/src/apis/axiosInstance";

export const updateUserStreak = async () => {
  try {
    const res = await axiosInstance.put("/user/streak");
    return { res: res.data, status: res.status };
  } catch (error) {
    // console.log("updateUserStreak error:", error);
    // console.log(error);
  }
};
