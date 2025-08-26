import FeedbackModal from "@/src/components/protection/FeedbackModal";
import ProtectionBox from "@/src/components/protection/ProtectionBox";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { userAvatar } from "@/src/utils/user/user";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileAndSettingsScreen = () => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  return (
    <AppSafeAreaView style={styles.container}>
      <CommonToolbar title={t("Profile and Settings")} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <AppLinearGradient
          colors={[Colors.primaryCyanColor, Colors.secondaryCyanColor]}
          style={styles.header}
        >
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: user?.avatar || userAvatar,
                }}
                style={styles.userImage}
              />
              {/* <TouchableOpacity style={styles.editAvatarBtn}>
                <Feather name="edit-2" size={14} color={Colors.white} />
              </TouchableOpacity> */}
            </View>

            <View style={styles.userInfoContainer}>
              <View style={styles.nameRow}>
                {user?.isPremium && (
                  <MaterialCommunityIcons
                    name="crown"
                    size={20}
                    color={Colors.yellow}
                    style={styles.crownIcon}
                  />
                )}
                <Text style={styles.userName}>{user?.name}</Text>
              </View>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </AppLinearGradient>
        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("Settings")}</Text>
          <ProtectionBox />
        </View>
        {/* Quick Actions Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t("Quick Actions")}</Text>
          <View style={styles.menuGrid}>
            <TouchableOpacity style={styles.menuCard} activeOpacity={0.7}>
              <View style={[styles.iconBox, styles.shareIconBox]}>
                <Ionicons name="share-social-outline" size={22} color="#fff" />
              </View>
              <Text style={styles.menuText}>{t("Share App")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              activeOpacity={0.7}
              onPress={() => setFeedbackVisible(true)} // 👈 open modal
            >
              <View style={[styles.iconBox, styles.rateIconBox]}>
                <Ionicons name="star-outline" size={22} color="#fff" />
              </View>
              <Text style={styles.menuText}>{t("Rate Us")}</Text>
            </TouchableOpacity>

            {/* Feedback Modal */}
            <FeedbackModal
              visible={feedbackVisible}
              onClose={() => setFeedbackVisible(false)} // 👈 close modal
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ by Team:{" "}
            <Text style={{ color: Colors.textSecondaryLight, fontFamily: "Poppins-Medium" }}>
              Tirthesh Jain, Aniket Gupta & Suraj Singh
            </Text>
          </Text>
          <Text
            style={{
              color: Colors.textSecondaryVeryLight,
              fontSize: 12,
              marginTop: 4,
              textAlign: "center",
            }}
          >
            App version 1.0
          </Text>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  avatarContainer: {
    position: "relative",
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primaryCyanColor,
    padding: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  userInfoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    // marginBottom: 4,
  },
  crownIcon: {
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.1)",
    // fontFamily: "Quicksand-Bold",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userEmail: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
    marginBottom: 8,
    // paddingLeft: 8,
  },
  menuGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  menuCard: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  iconBox: {
    padding: 6,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shareIconBox: {
    backgroundColor: "#007bff",
  },
  rateIconBox: {
    backgroundColor: "#ffc107",
  },
  menuText: {
    fontSize: 16,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
  },
});

export default ProfileAndSettingsScreen;
