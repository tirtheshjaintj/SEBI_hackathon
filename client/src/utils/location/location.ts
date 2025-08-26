import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return null;
    }
    let location = await Location.getCurrentPositionAsync({});
    const {
      coords: { latitude, longitude },
    } = location;
    return { latitude, longitude };
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export const getLocationCoordinates = async (options?: {
  accuracy?: number;
}) => {
  const accuracy = options?.accuracy ?? 2;
  try {
    let location = await Location.getCurrentPositionAsync({
      accuracy: accuracy,
    });
    if (!location) return null;
    const {
      coords: { latitude, longitude },
    } = location;
    return { latitude, longitude };
  } catch (error) {
    // console.error(error);
    return null;
  }
};

export const getLocationPermissionStatus = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status;
};
