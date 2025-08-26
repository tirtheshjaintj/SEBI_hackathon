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

import MessageSimulation from "@/src/modules/simulations/message/MessageSimulation";
import SmsChatScreen from "@/src/modules/simulations/message/SmsChatScreen";
import { useTranslation } from "react-i18next";

const Message = () => {
  const [isMessageSimulationOn, setIsMessageSimulationOn] = useState(false);
  const [isSmsChatBoxOn, setisSmsChatBoxOn] = useState(false);
    const { t  } = useTranslation();

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
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/660/660611.png",
                }}
                style={{ width: 40, height: 40 }}
              />

              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/234/234129.png",
                }}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  left: "43%",
                  zIndex: 2,
                }}
              />
              <View style={styles.dashedLine} />
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/660/660611.png",
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>

            <Text style={styles.cardTitle}>{t("SMS Scam Simulation")}</Text>
            <Text style={styles.cardDescription}>
              {t("Learn how SMS-based fraudsters operate and how you can recognize suspicious messages before they trap you.")}
            </Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Banking OTP traps")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Link-based phishing")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Urgent fake alerts")}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsMessageSimulationOn(true)}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color="white"
              />
              <Text style={styles.buttonText}>{t("Begin SMS Simulation")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t("Tip: Real banks and institutions never ask for sensitive info via SMS. Avoid clicking on suspicious links or replying to unknown numbers.")}
            </Text>
          </View>
        </AppSafeAreaView>
      </ScrollView>

      <ModalWrapper 
        disableTouchClose={true} visible={isMessageSimulationOn} onClose={() => {
            setIsMessageSimulationOn(false);
            }}>
        <MessageSimulation
          onClose={() => {
            setIsMessageSimulationOn(false);
            setisSmsChatBoxOn(true);
          }}
        />
      </ModalWrapper>

      <ModalWrapper 
        disableTouchClose={true} visible={isSmsChatBoxOn} onClose={() => {setisSmsChatBoxOn(false)}}>
        <SmsChatScreen onClose={() => setisSmsChatBoxOn(false)} />
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Message;
