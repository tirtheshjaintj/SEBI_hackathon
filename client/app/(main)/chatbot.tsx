import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChatBotSelectionScreen() {
  const { t } = useTranslation();
  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View>
        <Text style={styles.title}>{t("Choose a Bot")}</Text>
        <Text style={styles.subtitle}>
          {t("Select the assistant that fits your needs")}
        </Text>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Support Bot Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.cardWrapper}
          onPress={() => router.push("/(main)/support_bot/support_bot")}
        >
          <LinearGradient
            colors={["#A55EEA", "#7B4BB7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Ionicons
              name="help-circle"
              size={40}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>{t("Support Bot")}</Text>
            <Text style={styles.cardDescription}>
              {t("Get quick help and troubleshooting tips")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Advisory Bot Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.cardWrapper}
          onPress={() => router.push("/(main)/advisory_bot/advisor_bot")}
        >
          <LinearGradient
            colors={["#FF6F61", "#D65B4F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <MaterialCommunityIcons
              name="account-tie"
              size={40}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>{t("Advisory Bot")}</Text>
            <Text style={styles.cardDescription}>
              {t("Receive tailored advice and guidance")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 100,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: Colors.primaryCyanColor,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Questrial-SemiBold",
    color: Colors.textSecondaryDark,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
  },
  icon: {
    marginBottom: 14,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardDescription: {
    color: "#f0f0f0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 18,
  },
});
