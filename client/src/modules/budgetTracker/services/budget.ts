import axiosInstance from "@/src/apis/axiosInstance";

export const fetchBudgetData = async ({
  range = "monthly",
}: {
  range: "monthly" | "daily" | "weekly" | null;
}) => {
  try {
    console.log(range);
    const response = await axiosInstance.get(`/budget?cycle=${range}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBudget = async (data: any) => {
  try {
    const res = await axiosInstance.post("/budget", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = async (data: any) => {
  try {
    const res = await axiosInstance.post("/budget/expense", data);
    // console.log({ res });
    return { res: res.data, status: res.status };
  } catch (error) {
    console.log(error);
  }
};
export const updateExpense = async (data: any) => {
  try {
    const res = await axiosInstance.put("/budget/expense", data);
    // console.log({ res });
    return { res: res.data, status: res.status };
  } catch (error) {
    console.log(error);
  }
};
