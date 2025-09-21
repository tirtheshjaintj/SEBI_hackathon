import ModalWrapper from "@/src/components/modal/ModalWrapper";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import StreamStockScreen from "@/src/modules/simulations/stock_stream/StockStream";
import Colors from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const InfluencerStockScam = () => {
  const [isSimulationOn, setIsSimulationOn] = useState(false);
  const { t } = useTranslation();

  const closeModal = () => {
    setIsSimulationOn(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AppSafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1688/1688400.png",
                }}
                style={{ width: 40, height: 40 }}
              />

              <View style={styles.dashedLine} />

              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
                }}
                style={{ width: 40, height: 40 }}
              />
            </View>

            <Text style={styles.cardTitle}>
              {t("Influencer Stock Scam Simulation")}
            </Text>
            <Text style={styles.cardDescription}>
              {t(
                "Experience how scammers use fake stock charts and charismatic influencers to trick people into risky investments."
              )}
            </Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="trending-up"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Fake stock charts with dramatic rises and dips")}
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="person-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("Charismatic influencer hyping investments")}
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={Colors.darkYellow}
                />
                <Text style={styles.featureText}>
                  {t("High-pressure tactics to lure quick investment")}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => setIsSimulationOn(true)}
            >
              <Ionicons name="play-circle-outline" size={20} color="white" />
              <Text style={styles.buttonText}>{t("Start Stock Stream Simulation")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.tipText}>
              {t(
                "Tip: Real financial advice never comes from flashy livestreams. Always verify stock information with trusted sources."
              )}
            </Text>
          </View>
        </AppSafeAreaView>
      </ScrollView>

      <ModalWrapper
        disableTouchClose={true}
        visible={isSimulationOn}
        onClose={() => setIsSimulationOn(false)}
      >
        <StreamStockScreen closeModal={closeModal} />
      </ModalWrapper>
    </View>
  );
};

export default InfluencerStockScam;

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
    borderRadius: 25,
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
