import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import CallOngoingScreen from "@/src/modules/simulations/Call/OnGoingCallSimulation";
import CallScreen from "@/src/modules/simulations/Call/CallSimulation";
import Colors from "@/src/theme/colors";
import { Image } from "expo-image";
import AppTouchableButton from "@/src/components/buttons/AppTouchableButton";


import { useTranslation } from "react-i18next";
const Call = () => {
  const [isCallScreenOn, setIsCallScreenOn] = useState(false);
  const [isCallOnGoing, setIsCallOnGoing] = useState(false);
  const [isStoryModalVisible, setIsStoryModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const { t } = useTranslation();
  const stories = [
    { label: t("Bank Impersonation Scam"), value: 1 },
    { label: t("Fake Free Vacation Scam"), value: 2 },
    { label: t("Tech-Support Scam"), value: 3 },
    { label: t("Parcel Verification Scam"), value: 4 }
  ];


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AppSafeAreaView style={styles.safeArea}>
          {/* <View style={styles.header}>
            <Text style={styles.title}>Call Security Training</Text>
            <Text style={styles.subtitle}>Master the art of identifying fraudulent calls</Text>
          </View> */}

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
                  uri: "https://cdn-icons-png.flaticon.com/512/1436/1436989.png",
                }}
                style={{ width: 48, height: 48 }}
              />

              {/* Dashed Line */}
              <View style={styles.dashedLine} />

              {/* Right Icon */}
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4458/4458708.png",
                }}
                style={{ width: 48, height: 48 }}
              />
            </View>

            <Text style={styles.cardTitle}>{t("Real-World Simulation")}</Text>
            <Text style={styles.cardDescription}>
              {t("Our immersive training prepares you for sophisticated social engineering attacks through realistic scenarios.")}
            </Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Bank fraud scenarios")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Tech support scams")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Government impersonation")}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsStoryModalVisible(true)}
            >
              <Ionicons name="call-outline" size={20} color="white" />
              <Text style={styles.buttonText}>{t("Begin Simulation")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t("Professional tip: Always verify caller identity through official channels before sharing any information.")}
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
                setIsCallScreenOn(true);
              }}
              disabled={selectedStory === null}
            >
              <Text style={styles.confirmText}>{t("Start Simulation")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalWrapper>


      <ModalWrapper 
        disableTouchClose={true} visible={isCallScreenOn} onClose={() => { 
            setIsCallScreenOn(false);}}>
        <CallScreen
          onAccept={() => {
            setIsCallScreenOn(false);
            setIsCallOnGoing(true);
          }}
          onDecline={() => {
            setIsCallScreenOn(false);
          }}
        />
      </ModalWrapper>

      <ModalWrapper 
        disableTouchClose={true} visible={isCallOnGoing} onClose={() => { 
            setIsCallOnGoing(false);}}>
        <CallOngoingScreen
          onClose={() => {
            setIsCallOnGoing(false);
          }}
          storyNumber={selectedStory ?? 1}
        />
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  dashedLine: {
    flex: 1,
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.3,
    borderColor: Colors.textSecondaryLight,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgGreenTint,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    lineHeight: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    // marginTop: 24,
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
  cardTitle: {
    fontSize: 18,
    color: Colors.textSecondaryDark,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    // marginBottom: 12,
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
    backgroundColor: Colors.secondayCyanLite,
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

export default Call;
