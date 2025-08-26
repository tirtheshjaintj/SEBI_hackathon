import ModalWrapper from "@/src/components/modal/ModalWrapper";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/src/theme/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const LevelUpModal = ({
  level,
  onClose,
  visible,
}: {
  level: number;
  onClose: () => void;
  visible: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <ModalWrapper visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Background Celebration GIF */}
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/f1/98/2e/f1982ee8df2bd51eacc8d4ffa71b2e62.gif",
          }}
          style={styles.background}
          contentFit="cover"
        />

        {/* Content Overlay */}
        <View style={styles.content}>
          {/* Trophy or Badge */}
          <FontAwesome6
            name="trophy"
            size={moderateScale(80)}
            color="#FFD700"
            style={styles.glow}
          />

          {/* Level Text */}
          <Text style={styles.levelText}>{t("Level Up")}!</Text>
          <Text style={styles.levelNumber}>
            {t("You are now Level")} {level}
          </Text>

          {/* Optional: Tagline */}
          <Text style={styles.tagline}>{t("Keep going, champion")}! 💪</Text>
        </View>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: moderateScale(24),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  glow: {
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: verticalScale(10),
  },
  levelText: {
    fontSize: moderateScale(32),
    color: Colors.yellowPrimary,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  levelNumber: {
    fontSize: moderateScale(20),
    color: "white",
    fontFamily: "Quicksand-SemiBold",
    marginVertical: verticalScale(8),
  },
  tagline: {
    fontSize: moderateScale(14),
    color: "#ddd",
    fontFamily: "Quicksand-Medium",
    marginTop: verticalScale(4),
  },
});

export default LevelUpModal;
