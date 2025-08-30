import GoogleSignInButton from "@/src/components/googleSignin/GoogleSignInButton";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import LinearGradientText from "@/src/components/shared/LinearGradientText";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Device from 'expo-device';
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { createUser, sendNotification } from "../services/auth";
import { setUserInSession } from "../utils/auth";

const GuestEntryScreen = () => {
  const [isInProgress, setIsInProgress] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation();

  const handleSignIn = useCallback(async () => {
    try {
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signOut();
      const userInfo = (await GoogleSignin.signIn()) as {
        data: { idToken: string };
      };
      const res = await createUser({ tokenId: userInfo.data.idToken });

      // console.log({"dad": res });
      if (res && res.user) {
        const user = res.user;
        // console.log({ user });
        const userDetails = {
          accessToken: res.token,
          name: user.name,
          email: user.email,
          _id: user._id,
          avatar: user.avatar,
          ...user,
        };

        // console.log({ userDetails });
        await setUserInSession({
          user: userDetails,
        });
        setUser({ user: userDetails });
        // Toast.show({
        //   type: "success",
        //   text1: "Welcome, " + user.name,
        // });

        const deviceInfo = {
          os: `${Device.osName ?? "Unknown"} ${Device.osVersion ?? ""}`.trim(),
          brand: Device.brand ?? "Unknown",
          model: Device.modelName ?? "Unknown",
          modelId: Device.modelId ?? "Unknown",
          manufacturer: Device.manufacturer ?? "Unknown",
          isDevice: Device.isDevice, // false = emulator/simulator
        };
        sendNotification({ name: user.name, email: user.email, deviceInfo });
        router.replace("/home");
      }
    } catch (error) {
      console.log("Google Sign-In Error:", error);
      Toast.show({
        type: "error",
        text1: t("Google Sign-In Signup Failed Try Again"),
      });
    } finally {
      setIsInProgress(false);
    }
  }, [setUser]);

  return (
    <View style={styles.container}>
      <AppLinearGradient
        colors={[Colors.primaryCyanColor, Colors.primaryBackground]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ flex: 1 }}>
        <View style={styles.content_container}>
          <Image
            source={require("@/assets/images/onboarding/guestscreen.png")}
            style={styles.image}
          />
          <View
            style={{
              flex: 1,
              marginTop: verticalScale(100),
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              {/* <LinearGradientText
                startColor={Colors.primaryBackground}
                endColor={Colors.primaryCyanColor}
                style={styles.w_text}
                text="W"
              /> */}
              <LinearGradientText
                startColor={Colors.primaryBackground}
                endColor={Colors.primaryCyanColor}
                style={styles.titleText}
                text={t("Welcome")}
              />
            </View>
            <Text style={styles.welcome_text}>
              {t(
                "smarterChoices"
              )}
            </Text>

            <View
              style={{ gap: verticalScale(10), marginTop: verticalScale(16) }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <Image
                  source={require("@/assets/images/onboarding/1.png")}
                  style={styles.icon}
                />
                <Text style={styles.featureText}>
                  {t("Learn budgeting & saving")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <Image
                  source={require("@/assets/images/onboarding/2.png")}
                  style={styles.icon}
                />
                <Text style={styles.featureText}>
                  {t("Spot UPI & SMS scams")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <Image
                  source={require("@/assets/images/onboarding/3.png")}
                  style={styles.icon}
                />
                <Text style={styles.featureText}>
                  {t("Build financial confidence")}
                </Text>
              </View>
            </View>
          </View>
          {/* <AppTouchableButton
            text=" Guest Login "
            textStyle={styles.btn_text}
            style={styles.btn_style}
            onPress={() => {
              router.replace("/(onboarding)/details");
            }}
          /> */}
          <GoogleSignInButton
            isInProgress={isInProgress}
            onPress={handleSignIn}
          />
          <Text style={styles.footerText}>
            {t(
              "Built for curious minds, cautious spenders, and confident futures."
            )}
          </Text>
        </View>
      </AppSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content_container: {
    backgroundColor: "white",
    padding: moderateScale(16),
    flex: 1,
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    paddingBottom: verticalScale(10),
    marginTop: verticalScale(200),
    boxShadow: "2px 3px 20px rgba(226, 226, 226, 0.5)",
    justifyContent: "space-between",
  },
  btn_style: {
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(100),
  },
  btn_text: {
    color: "white",
    fontSize: moderateScale(20),
    fontFamily: "Poppins",
  },
  image: {
    width: scale(300),
    height: verticalScale(300),
    position: "absolute",
    top: verticalScale(-200),
    alignSelf: "center",
    resizeMode: "contain",
  },
  w_text: {
    color: Colors.textPrimary,
    fontSize: moderateScale(35),
    fontFamily: "Poppins-Bold",
  },
  titleText: {
    color: Colors.textPrimary,
    fontSize: moderateScale(25),
    fontFamily: "Poppins-Bold",
  },
  welcome_text: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(16),
    fontFamily: "Quicksand-SemiBold",
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: "cover",
    borderRadius: moderateScale(15),
    overflow: "hidden",
    borderWidth: moderateScale(0.5),
    borderColor: Colors.divider,
  },
  featureText: {
    fontSize: moderateScale(16),
    color: Colors.textPrimary,
    fontFamily: "Poppins-Medium",
  },

  footerText: {
    textAlign: "center",
    fontSize: moderateScale(12),
    color: Colors.textSecondaryLight,
    fontFamily: "Quicksand",
    marginTop: moderateScale(6),
  },
});

export default GuestEntryScreen;
