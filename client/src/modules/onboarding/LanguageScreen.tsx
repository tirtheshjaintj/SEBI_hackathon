import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { languageType } from "@/src/types/constants";
import {
  moderateScale,
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { saveItem } from "@/src/utils/storage/async_storage";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const LANGUAGES: { name: string; code: languageType; word: string }[] = [
  { name: "English", code: "en", word: "ENG" },
  { name: "Hindi", code: "hi", word: "हिंदी" },
  { name: "Punjabi", code: "pa", word: "ਪੰਜਾਬੀ" },
];

const LanguageScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const { language, setLanguage } = useAuthStore((state) => state);
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<languageType>(
    (i18n.language as languageType) || "en"
  );

  const handleChangeLang = async () => {
    try {
      setLoading(true);
      await i18n.changeLanguage(selectedLang);
      await saveItem("locale", selectedLang);
      setLanguage({ language: selectedLang });

      // Navigate to next onboarding screen or main app
      // navigation.navigate('NextScreen');

      Toast.show({
        type: "success",
        text1: t("Language changed successfully"),
        position: "bottom",
      });
    } catch (error) {
      console.error("Error changing language:", error);
      Toast.show({
        type: "error",
        text1: t("Failed to change language"),
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageOption = (item: (typeof LANGUAGES)[number]) => {
    const isSelected = item.code === selectedLang;

    return (
      <TouchableOpacity
        key={item.code}
        onPress={() => setSelectedLang(item.code)}
        activeOpacity={0.8}
        style={[
          styles.languageOptionContainer,
          isSelected
            ? styles.selectedLanguageOption
            : styles.unselectedLanguageOption,
        ]}
      >
        <View style={styles.radioContainer}>
          {isSelected ? (
            <Ionicons
              name="radio-button-on"
              size={moderateScale(20)}
              color={Colors.primaryCyanColor}
            />
          ) : (
            <Ionicons
              name="radio-button-off"
              size={moderateScale(20)}
              color={Colors.textSecondaryDark}
            />
          )}
        </View>

        <View style={styles.languageTextContainer}>
          <Text
            style={[
              styles.languageWord,
              !isSelected && { color: Colors.textGraySecondary },
            ]}
          >
            {item.word}
          </Text>
          <Text
            style={[
              styles.languageName,
              !isSelected && { color: Colors.textGraySecondary },
            ]}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppSafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("@/assets/images/icon.png")}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>{t("Choose Your Language")}</Text>

            <View style={styles.languagesContainer}>
              {LANGUAGES.map(renderLanguageOption)}
            </View>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleChangeLang}
              disabled={loading}
              style={styles.buttonContainer}
            >
              <AppLinearGradient
                colors={[Colors.primaryCyanColor, Colors.primaryBackground]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t("Continue")}</Text>
              </AppLinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              {t("You can change language anytime in the menu bar instantly")}
            </Text>
          </View>
        </View>
      </AppSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(40),
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(40),
  },
  logo: {
    width: scale(120),
    height: verticalScale(120),
  },
  title: {
    color: Colors.textPrimary,
    fontFamily: "Quicksand-SemiBold",
    fontSize: moderateScale(20),
    textAlign: "center",
    marginBottom: verticalScale(32),
  },
  languagesContainer: {
    width: "100%",
    gap: verticalScale(16),
  },
  languageOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    width: "100%",
    boxShadow: "2px 3px 20px rgba(226, 226, 226, 0.5)",
  },
  selectedLanguageOption: {
    backgroundColor: Colors.primaryCyanColor,
    borderColor: Colors.primaryCyanColor,
  },
  unselectedLanguageOption: {
    backgroundColor: Colors.bgGreenTint,
    borderWidth: 0.5,
    borderColor: Colors.primaryCyanColor,
  },
  radioContainer: {
    marginRight: scale(12),
  },
  languageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  languageWord: {
    fontFamily: "Quicksand-Bold",
    fontSize: moderateScale(18),
    color: Colors.white,
  },
  languageName: {
    fontFamily: "Quicksand-Medium",
    fontSize: moderateScale(16),
    color: Colors.white,
  },
  footerContainer: {
    marginBottom: verticalScale(32),
  },
  buttonContainer: {
    marginBottom: verticalScale(16),
  },
  button: {
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(90),
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(16),
    color: Colors.white,
  },
  footerText: {
    fontFamily: "Quicksand-Medium",
    fontSize: moderateScale(12),
    textAlign: "center",
    color: Colors.textGraySecondary,
    paddingHorizontal: scale(16),
  },
});

export default LanguageScreen;
