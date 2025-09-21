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
import PonziSimulation from "@/src/modules/simulations/ponzi_scheme/PonziScheme";
import { useTranslation } from "react-i18next";

const PonziSchemePage = () => {
  const [isSimulationOn, setIsSimulationOn] = useState(false);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AppSafeAreaView style={styles.safeArea}>
          {/* Simulation card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1907/1907954.png", // investor icon
                }}
                style={{ width: 40, height: 40 }}
              />

              <View style={styles.dashedLine} />

              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // scammer icon
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>

            <Text style={styles.cardTitle}>{t("Ponzi Scheme Simulation")}</Text>
            <Text style={styles.cardDescription}>
              {t(
                "See how early investors profit while later ones lose everything. Understand how false promises keep the scheme alive—until it collapses."
              )}
            </Text>

            {/* Features */}
            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Promises of guaranteed returns")}
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Early payouts from new investors’ money")}
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Inevitable collapse and losses")}
                </Text>
              </View>
            </View>

            {/* Start Simulation Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsSimulationOn(true)}
            >
              <Ionicons name="play-circle-outline" size={20} color="white" />
              <Text style={styles.buttonText}>
                {t("Start Ponzi Simulation")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tip box */}
          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t(
                "Tip: High-return, no-risk investments are a classic scam red flag. Always research and verify before investing."
              )}
            </Text>
          </View>
        </AppSafeAreaView>
      </ScrollView>

      {/* Simulation Modal */}
      <ModalWrapper
        disableTouchClose={true}
        visible={isSimulationOn}
        onClose={() => setIsSimulationOn(false)}
      >
        <PonziSimulation onCloseModal={() => setIsSimulationOn(false)} />
      </ModalWrapper>
    </View>
  );
};

export default PonziSchemePage;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: "white",
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
