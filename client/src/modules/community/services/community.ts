import axiosInstance from "@/src/apis/axiosInstance";

export const writePost = async (data: any) => {
  try {
    console.log("dada",data);
    const res = await axiosInstance.post("/post", data);
    console.log(res);
    return { res: res?.data, status: res?.status };
  } catch (error) {
    console.log(error);
  }
};
export const getAllPosts = async (data: any) => {
  try {
    const res = await axiosInstance.get("/post");
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const upVote = async ({ postId }: { postId: string }) => {
  try {
    const res = await axiosInstance.post(`/post/${postId}/toggle-upvote`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
