import Colors from "@/src/theme/colors";
import { languageType } from "@/src/types/constants";
import { saveItem } from "@/src/utils/storage/async_storage";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import LoaderFullScreen from "../loaders/LoaderFullScreen";
import CommonToolbar from "../toolBars/commonToolbar";
import AppSafeAreaView from "../viewWrappers/AppSafeAreaView";

const LANGUAGES: { name: string; code: languageType; word: string }[] = [
  { name: "English", code: "en", word: "Eng" },
  { name: "Hindi", code: "hi", word: "हिंदी" },
  { name: "Punjabi", code: "pa", word: "ਪੰਜਾਬੀ" },
];

const LanguageModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleChangeLanguage = async (language: languageType) => {
    try {
      setLoading(true);

      await i18n.changeLanguage(language);
      await saveItem("locale", language);
      setSelectedLang(language);

      Toast.show({
        type: "success",
        text1: "Language changed successfully",
        position: "bottom",
      });

      onClose();
    } catch (error) {
      console.error("Error changing language:", error);
      Toast.show({
        type: "error",
        text1: "Failed to change language",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }: { item: (typeof LANGUAGES)[number] }) => {
    const isSelected = item.code === selectedLang;
    return (
      <TouchableOpacity
        style={[
          styles.languageOption,
          isSelected && styles.selectedLanguageOption,
        ]}
        onPress={() => handleChangeLanguage(item.code)}
      >
        <View style={styles.languageLabel}>
          <Ionicons name="language-outline" size={20} color="#555" />
          <Text style={styles.languageText}>{item.name}</Text>
          <Text style={[styles.languageText, { fontSize: 12 }]}>
            ({item.word})
          </Text>
        </View>
        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppSafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          <CommonToolbar onBackPress={onClose} title={t("Change Language")} />
        <Text style={styles.sectionTitle}>{t("All")} {t("Languages")}</Text>
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </AppSafeAreaView>
      {loading && <LoaderFullScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  languageOption: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  selectedLanguageOption: {
    backgroundColor: Colors.bgGreenTint,
    borderWidth: 1,
    borderColor: Colors.primaryCyanColor,
  },
  languageLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
    fontFamily: "Poppins-SemiBold",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primaryCyanColor,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryCyanColor,
  },
});

export default LanguageModal;
