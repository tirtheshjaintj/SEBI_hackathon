import * as Clipboard from "expo-clipboard";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message";

export const openWhatsAppChat = (phone: string, message = "") => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "WhatsApp is not installed on your device");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(() => {
      Alert.alert("Error", "Failed to open WhatsApp");
    });
};

export const copyToClipboard = (text: string) => {
  Clipboard.setStringAsync(text);
  Toast.show({
    type: "success",
    text1: "Copied to clipboard",
  });
};

export const handleCall = (
  title: string,
  desc: string,
  cancel: string,
  call: string
) => {
  Alert.alert(
    title + " 1930",
    desc,
    [
      {
        text: cancel,
        style: "cancel",
      },
      {
        text: call,
        onPress: () => Linking.openURL("tel:1930"),
      },
    ],
    { cancelable: true }
  );
};
