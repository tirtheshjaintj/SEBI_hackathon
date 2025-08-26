import axiosInstance from "@/src/apis/axiosInstance";

export const getAllMerchandise = async () => {
  try {
    const res = await axiosInstance.get("/merchandise");
    console.log({ res });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
