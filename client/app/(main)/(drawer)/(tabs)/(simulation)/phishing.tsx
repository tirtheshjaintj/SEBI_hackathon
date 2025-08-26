import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";

import MailListing from "@/src/modules/simulations/phishing/MailListing";
import OpenedScamMail from "@/src/modules/simulations/phishing/OpenedMail";
import WebsiteSimulation from "@/src/modules/simulations/phishing/WebsiteSimulation";
import { useTranslation } from "react-i18next";

const Phishing = () => {
  const [isMailListOn, setIsMailListOn] = useState(false);
  const [isMailOpened, setIsMailOpened] = useState(false);
  const [isWebsiteOn, setIsWebsiteOn] = useState(false);
  const {t} = useTranslation();

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
                  uri: "https://cdn-icons-png.flaticon.com/512/3442/3442511.png",
                }}
                style={{ width: 40, height: 40 }}
              />
              <View style={styles.dashedLine} />
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/10751/10751935.png",
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>

            <Text style={styles.cardTitle}>{t("Phishing Simulation")}</Text>
            <Text style={styles.cardDescription}>
              {t("Understand how fraudulent emails lure victims into revealing passwords, bank credentials, or installing malware.")}
            </Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Fake email warnings")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>{t("Malicious website links")}</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Credential harvesting pages")}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsMailListOn(true)}
            >
              <Ionicons name="shield-outline" size={20} color="white" />
              <Text style={styles.buttonText}>{t("Start Simulation")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t("Tip: Always check the sender’s email address and never click suspicious links. Legit organizations never ask for sensitive info over email.")}
            </Text>
          </View>
        </AppSafeAreaView>
      </ScrollView>

      <ModalWrapper 
        disableTouchClose={true} visible={isMailListOn} onClose={() => {
            setIsMailListOn(false);
      }}>
        <MailListing
          next={() => {
            setIsMailOpened(true);
            setIsMailListOn(false);
          }}
          onClose={() => setIsMailListOn(false)}
        />
      </ModalWrapper>

      <ModalWrapper 
        disableTouchClose={true} visible={isMailOpened} onClose={() => {
            setIsMailOpened(false);
      }}>
        <OpenedScamMail
          next={() => {
            setIsWebsiteOn(true);
            setIsMailOpened(false);
          }}
        />
      </ModalWrapper>

      <ModalWrapper 
        disableTouchClose={true} visible={isWebsiteOn} onClose={() => {setIsWebsiteOn(false)}}>
        <WebsiteSimulation onClose={() => setIsWebsiteOn(false)} />
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

export default Phishing;
