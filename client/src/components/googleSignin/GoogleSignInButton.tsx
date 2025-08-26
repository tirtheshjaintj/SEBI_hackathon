import Colors from "@/src/theme/colors";
import { GoogleSigninButton as GoogleLogoButton } from "@react-native-google-signin/google-signin";
import React from "react";
import { StyleSheet, View } from "react-native";

const GoogleSignInButton = ({
  onPress,
  isInProgress,
}: {
  onPress: () => void;
  isInProgress: boolean;
}) => {
  return (
    <View style={styles.container}>
      <GoogleLogoButton
        disabled={isInProgress}
        size={GoogleLogoButton.Size.Wide}
        style={styles.button}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: Colors.primaryCyanColor,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default GoogleSignInButton;
