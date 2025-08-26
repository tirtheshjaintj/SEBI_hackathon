// import { fetch } from "react-native-ssl-pinning";
// import { getSession } from "../utils/auth/auth";
// import { BASE_URL } from "../utils/baseUrl";
// import { decrypt, encrypt } from "../utils/encryption/aes";
// import { getSavedItem } from "../utils/storage/async_storage";

// export const sslInstance = async (
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
//   data = null
// ) => {
//   try {
//     const session = await getSession();
//     const language = await getSavedItem("locale");
//     const accessToken = session?.accessToken;

//     const headers = {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${accessToken}`,
//       language: language ?? "en",
//     };

//     const body = data ? JSON.stringify({ encrypted: encrypt(data) }) : null;

//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       method,
//       headers,
//       ...(body && { body }),
//       sslPinning: {
//         certs: ["server_cer"], // without `.cer` extension
//       },
//     });

//     const json = await response.json();
//     const decrypted = json?.encrypted ? decrypt(json.encrypted) : json;

//     return { success: true, data: decrypted };
//   } catch (error) {
//     console.log("SSL Request Error:", error);
//     return { success: false, error };
//   }
// };
