import axiosInstance from "@/src/apis/axiosInstance";

export const getCheckoutOrderId = async ({ amount }: { amount: number }) => {
  try {
    const response = await axiosInstance.post(`/payment/order`, { amount });
    return { res: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

type dataType = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  receiptId: string;
};
export const verifyPayment = async ({ data }: { data: dataType }) => {
  try {
    const response = await axiosInstance.post(`/payment/verify`, data);
    return { res: response.data, status: response.status };
  } catch (error) {
    // console.error(error);
  }
};
