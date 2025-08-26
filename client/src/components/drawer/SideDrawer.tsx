import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { getSession, logout } from "@/src/utils/auth/auth";
import { handleCall } from "@/src/utils/social/social";
import { userAvatar } from "@/src/utils/user/user";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Confirmation from "../alerts/Confirmation";
import SubscriptionButton from "../buttons/SubscriptionButton";
import LanguageModal from "../modal/LanguageModal";
import ModalWrapper from "../modal/ModalWrapper";
import AppLinearGradient from "../shared/AppLinearGradient";
import AppSafeAreaView from "../viewWrappers/AppSafeAreaView";

const drawerItems = [
  {
    label: "Dictionary",
    icon: "book-outline",
    onPress: () => {
      router.push("/dictionary");
    },
    // color: Colors.redLight,
  },
  {
    label: "Tutorials",
    icon: "play-circle-outline",
    onPress: () => {
      router.push("/tutorial/topics");
    },
    // color : "blue"
  },
  {
    label: "Latest News & Updates",
    icon: "newspaper-outline",
    onPress: () => {
      router.push("/news/news");
    },
  },
  // {
  //   label: "Goals",
  //   icon: "trophy",
  //   onPress: () => {
  //     router.push("/goals");
  //   },
  // },
];

const SideDrawer = ({ navigation }: any) => {
  const { user, setUser } = useAuthStore((state) => state);
  const [confirLogout, setConfirmLogout] = React.useState(false);
  const [openLanguageModal, setOpenLanguageModal] = React.useState(false);
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await logout();
    const session = await getSession();
    if (!session) {
      setUser({ user: null });
    }
  };

  // Tooltip & Shake Logic
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Shake on open
    rotate.value = withSequence(
      withTiming(-5, { duration: 100 }),
      withRepeat(withTiming(5, { duration: 100 }), 3, true),
      withTiming(0, { duration: 100 })
    );
  }, []);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <AppSafeAreaView style={{ flex: 1, position: "relative", paddingTop: 0 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <AppLinearGradient
            colors={[Colors.primaryCyanColor, Colors.secondaryCyanColor]}
            style={styles.header}
          >
            <Image
              source={{
                uri: user?.avatar || userAvatar,
              }}
              style={styles.userImage}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              {user?.isPremium && (
                <MaterialCommunityIcons
                  name="crown"
                  size={20}
                  color={Colors.white}
                />
              )}
              <Text style={styles.userName}>{user?.name}</Text>
            </View>

            <Text style={styles.userEmail}>{user?.email}</Text>

            <SubscriptionButton />
          </AppLinearGradient>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {drawerItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View style={styles.settingsIconContainer}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={Colors.primaryCyanColor}
                    />
                  </View>

                  <Text style={styles.menuText}>{t(item.label)}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#ddd"
                  // style={styles.menuChevron}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Divider style={{ height: 0.5, backgroundColor: Colors.divider }} />
          {/* Settings & Help */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              onPress={() => setOpenLanguageModal(true)}
              style={styles.footerItem}
            >
              <View style={styles.settingsIconContainer}>
                <Ionicons
                  name="language-sharp"
                  size={20}
                  color={Colors.primaryCyanColor}
                />
              </View>
              <Text style={styles.footerText}>{t("Change Language")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={styles.footerItem}
            >
              <View style={styles.settingsIconContainer}>
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={Colors.primaryCyanColor}
                />
              </View>
              <Text style={styles.footerText}>{t("Settings")}</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Out */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => setConfirmLogout(true)}
              style={styles.signOutButton}
            >
              <MaterialCommunityIcons name="logout" size={20} color="#666" />
              <Text style={styles.signOutText}>{t("Sign Out")}</Text>
            </TouchableOpacity>
            <View style={styles.fabWrapper}>
              <Text style={styles.tooltip}>{t("Cyber Crime Helpline")}</Text>
              <Animated.View style={[shakeStyle]}>
                <TouchableOpacity
                  style={styles.fab}
                  onPress={() =>
                    handleCall(
                      t("Cyber Crime Helpline"),
                      t("Would you like to call the helpline?"),
                      t("Cancel"),
                      t("Call")
                    )
                  }
                >
                  <FontAwesome name="phone" size={20} color="#fff" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </AppSafeAreaView>

      <ModalWrapper
        visible={confirLogout}
        onClose={() => {
          setConfirmLogout(false);
        }}
      >
        <Confirmation
          title={t("Are you sure to sign out?")}
          onCancel={() => {
            setConfirmLogout(false);
          }}
          onConfirm={() => {
            handleSignOut();
            setConfirmLogout(false);
          }}
        />
      </ModalWrapper>

      <ModalWrapper
        visible={openLanguageModal}
        onClose={() => {}}
        disableTouchClose
        animationType="slide"
      >
        <LanguageModal onClose={() => setOpenLanguageModal(false)} />
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingBottom: 100 },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: Colors.white,
  },
  userName: { color: "#fff", fontSize: 18, fontWeight: "600" },
  userEmail: { color: "#fff", fontSize: 13, opacity: 0.8 },
  menuContainer: { paddingHorizontal: 20, paddingTop: 24 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
  footerRow: {
    gap: 20,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingsIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: "rgba(0, 180, 216, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
  footer: {
    paddingHorizontal: 24,
    // borderTopWidth: 1,
    // borderColor: "#eee",
    // marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  signOutText: {
    fontSize: 16,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },

  // FAB + Tooltip
  fabWrapper: {
    alignItems: "center",
  },
  tooltip: {
    fontSize: 12,
    color: "#444",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  fab: {
    backgroundColor: "#d90429",
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  upgrade_btn: {},
  upgrade_btn_text: {
    color: "#fff",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 14,
  },
});

export default SideDrawer;
