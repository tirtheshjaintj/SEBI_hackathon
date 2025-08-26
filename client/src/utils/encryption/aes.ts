import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.EXPO_PUBLIC_CRYPTO_SECRET_KEY as string;

export const encrypt = (data: any): string => {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

export const decrypt = (cipherText: string): any => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};
