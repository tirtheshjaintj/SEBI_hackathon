import * as Network from "expo-network";

export const getIP = async () => {
  const ip = await Network.getIpAddressAsync();
  return ip;
};
