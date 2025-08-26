import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { moderateScale, verticalScale } from "@/src/utils/responsiveness/responsiveness";
import Colors from "@/src/theme/colors";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import financeGuidesByLocale from "./data"; // <-- adjust path if needed
import { MaterialIcons } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { languageType } from "@/src/types/constants";

interface Item {
  id: string;
  title: string;
  description: string;
  uri: string;
}

const FinanceGuidesTopics = () => {
  
  const {t, i18n } = useTranslation();
  const localeObj = i18n.language as languageType;
  const locale: languageType = localeObj;
  const topics = financeGuidesByLocale[locale];
  const [selectedTopic, setSelectedTopic] = useState<Item | null>(null);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedTopic(item)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.iconImage}
        resizeMode="contain"
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <AppSafeAreaView style={styles.safeArea}>
      <CommonToolbar title={t("Finance Guides")} />
      <View style={styles.mainContainer}>
        <Text style={styles.header}>{t("Personal Finance Tips")}</Text>
        <Text style={styles.subHeader}>{t("Tap to learn about each topic")}</Text>
        <FlatList
          data={topics}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Modal
        visible={!!selectedTopic}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedTopic(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              onPress={() => setSelectedTopic(null)}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <MaterialIcons name="close" size={22} color={Colors.textPrimary} />
            </TouchableOpacity>
            {selectedTopic && (
              <>
                <Image
                  source={{ uri: selectedTopic.uri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalTitle}>{selectedTopic.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedTopic.description}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9fafc" },
  mainContainer: { flex: 1, paddingHorizontal: moderateScale(16) },
  header: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(4),
    fontFamily: "Quicksand-Bold",
  },
  subHeader: {
    fontSize: moderateScale(13),
    color: Colors.textSecondaryDark,
    marginBottom: verticalScale(16),
    fontFamily: "Quicksand-Medium",
  },
  listContent: { paddingBottom: verticalScale(32) },
  row: { justifyContent: "space-between", marginBottom: verticalScale(16) },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(14),
    alignItems: "center",
    padding: moderateScale(12),
    marginHorizontal: moderateScale(4),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 30,
  },
  iconImage: {
    width: moderateScale(48),
    height: moderateScale(48),
    marginBottom: verticalScale(8),
  },
  cardTitle: {
    fontSize: moderateScale(13),
    color: Colors.textPrimary,
    textAlign: "center",
    fontFamily: "Quicksand-SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginBottom: verticalScale(16),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: Colors.textPrimary,
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
    marginBottom: verticalScale(12),
  },
  modalDescription: {
    fontSize: moderateScale(14),
    color: Colors.textGraySecondary,
    lineHeight: verticalScale(22),
    fontFamily: "Quicksand-Regular",
    textAlign: "justify",
  },
});

export default FinanceGuidesTopics;
