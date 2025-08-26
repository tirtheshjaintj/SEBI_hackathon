import axiosInstance from "@/src/apis/axiosInstance";

export const getAllReports = async () => {
  try {
    const response = await axiosInstance.get("/report/view");
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}