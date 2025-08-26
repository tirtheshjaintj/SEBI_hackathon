import axiosInstance from "@/src/apis/axiosInstance";

export const getAllLevelsData = async () => {
  try {
    const res = await axiosInstance.get("/quiz/levels");
    console.log({res : res.data.levels})
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleLevelQuiz = async (levelId: string) => {
  try {
    const res = await axiosInstance.get(`/quiz/?level=${levelId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const submitAnswer = async (submissions: any) => {
  console.log({ submissions });
  try {
    const res = await axiosInstance.post(`/quiz/submit`, {
      submitions:submissions,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
