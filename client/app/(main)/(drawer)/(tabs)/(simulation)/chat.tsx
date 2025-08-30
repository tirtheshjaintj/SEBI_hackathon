import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { Image } from "expo-image";
import ChatSimulation from "@/src/modules/simulations/chat/ChatSimulation";
import { useTranslation } from "react-i18next";

const Chat = () => {
  const [isChatSimulationOn, setIsChatSimulationOn] = useState(false);
    const [isStoryModalVisible, setIsStoryModalVisible] = useState(false);
    const [selectedStory, setSelectedStory] = useState<number | null>(null);
    const { t  } = useTranslation();
    const stories = [
      { label: t("Loan OTP Scam"), value: 1 },
      { label: t("Fake iPhone Prize Scam"), value: 2 },
      { label: t("Parcel Verification Scam"), value: 3 }
    ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AppSafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View
              style={[
                styles.iconContainer,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              {/* Left Icon */}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/256/762/762147.png",
                }}
                style={{ width: 40, height: 40 }}
              />

              {/* Dashed Line */}
              <View style={styles.dashedLine} />

              {/* Right Icon */}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/724/724715.png",
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>

            <Text style={styles.cardTitle}>{t("Chat Scam Simulation")}</Text>
            <Text style={styles.cardDescription}>
              {t("Dive into real-time fake chat simulations to learn how scam messages trick users into sharing private info.")}
            </Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Fake job offers")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Phishing links")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Impersonated accounts")}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsStoryModalVisible(true)}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color="white"
              />
              <Text style={styles.buttonText}>{t("Begin Chat Simulation")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t("Tip: Never click suspicious links. Always verify the sender before replying to messages with personal information.")}
            </Text>
          </View>
        </AppSafeAreaView>
      </ScrollView>

      <ModalWrapper
        visible={isStoryModalVisible}
        onClose={() => setIsStoryModalVisible(false)}
        disableTouchClose={true}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t("Select a Story")}</Text>

          <View style={styles.storyList}>
            {stories.map((story) => {
              const isSelected = selectedStory === story.value;
              return (
                <TouchableOpacity
                  key={story.value}
                  style={[styles.storyItem, isSelected && styles.storyItemActive]}
                  onPress={() => setSelectedStory(story.value)}
                  activeOpacity={0.85}
                >
                  <View style={styles.storyItemLeft}>
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={22}
                      color={
                        isSelected ? Colors.primaryCyanColor : Colors.textSecondaryDark
                      }
                    />
                    <Text
                      style={[
                        styles.storyLabel,
                        isSelected && styles.storyLabelActive,
                      ]}
                    >
                      {t(story.label)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setIsStoryModalVisible(false)}
            >
              <Text style={styles.cancelText}>{t("Cancel")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                !selectedStory && styles.actionButtonDisabled,
              ]}
              onPress={() => {
                if (selectedStory === null) return;
                setIsStoryModalVisible(false);
                setIsChatSimulationOn(true);
              }}
              disabled={selectedStory === null}
            >
              <Text style={styles.confirmText}>{t("Start Simulation")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalWrapper>


      <ModalWrapper 
        disableTouchClose={true} visible={isChatSimulationOn} onClose={() => {setIsChatSimulationOn(false)}}>
        <ChatSimulation story_num={selectedStory ?? 1} onClose={() => setIsChatSimulationOn(false)} />
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.bgGreenTint,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  safeArea: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.3,
    borderColor: Colors.textSecondaryLight,
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: Colors.textSecondaryDark,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    lineHeight: 18,
    marginVertical: 16,
  },
  features: {
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontFamily: "Quicksand-Medium",
    marginLeft: 12,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryCyanColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginLeft: 12,
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
        borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginTop: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Regular",
    marginLeft: 12,
    lineHeight: 20,
  },
  
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
    color: Colors.textPrimary,
  },
  storyList: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.textSecondaryLight,
    marginBottom: 20,
  },
  storyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
  },
  storyItemActive: {
    backgroundColor: Colors.secondayCyanLite,
  },
  storyItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  storyLabel: {
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
    color: Colors.textPrimary,
  },
  storyLabelActive: {
    fontFamily: "Quicksand-SemiBold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryCyanColor,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: "#EAEAEA",
  },
  cancelText: {
    color: Colors.textPrimary,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  confirmText: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});

export default Chat;
