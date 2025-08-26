import Colors from "@/src/theme/colors";
import { useTranslation } from "react-i18next";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Message } from "../SupportBot";
const LinkMessage = ({
  item,
  nextStep,
  isActive,
}: {
  item: Message;
  nextStep: () => void;
  isActive: boolean;
}) => {
  const openLink = () => {
    if (!isActive) return; // ignore if not active
    if (item.action?.value && typeof item.action.value === "string") {
      Linking.openURL(item.action.value);
      nextStep();
    }
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.message}>
          {item.step === "Go to Cyber Crime Portal"
            ? t(
                "Now that you have visited the official website, please click on the link below to go to the Cyber Crime Portal"
              )
            : item.step === "Login Website"
            ? t("Login to notify the bank")
            : t("For resolving this issue, please visit the official website.")}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !isActive && { opacity: 0.5 }]} // greyed out if inactive
        onPress={openLink}
        disabled={!isActive}
      >
        <Text style={styles.buttonText}>{t("Go to Website")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start", // left-aligned for bot messages
    marginVertical: 6,
    maxWidth: "80%",
  },
  bubble: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderTopLeftRadius: 0, // like a chat bubble tail
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
  button: {
    flexDirection: "row", // To align icon and text horizontally if needed
    alignItems: "center",
    backgroundColor: Colors.primaryCyanColor,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginVertical: 4,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default LinkMessage;
