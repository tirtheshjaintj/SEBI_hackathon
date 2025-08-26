import Colors from "@/src/theme/colors";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppTextInput from "@/src/components/formElements/AppTextInput";
import { router } from "expo-router";
import { createUser } from "../services/auth";
import { setUserInSession } from "../utils/auth";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import { HTTP_STATUS_CODES } from "@/src/constants/constant";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import AppTouchableButton from "@/src/components/buttons/AppTouchableButton";
import {
  moderateScale,
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";

const PersonalDetailsScreen = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!name) {
        Toast.show({
          type: "error",
          text1: "Please enter your name",
        });
        return;
      }
      setLoading(true);
      const res = (await createUser({ name })) as any;
      console.log({ res });
      if (res && res.user) {
        const user = res.user;
        await setUserInSession({
          user,
        });
        setUser({ user: user });
        Toast.show({
          type: "success",
          text1: "Welcome, " + name,
        });
        // router.replace("/(main)/(drawer)/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <View style={styles.main_container}>
        <AppLinearGradient
          colors={[Colors.primaryCyanColor, Colors.primaryBackground]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />

        <View style={styles.avatar_container}>
          <Image
            source={require("@/assets/images/global/avatar.png")}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>

        <AppSafeAreaView
          style={{
            flex: 1,
            borderTopRightRadius: moderateScale(20),
            borderTopLeftRadius: moderateScale(20),
            backgroundColor: Colors.white,
          }}
        >
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Your Profile Name</Text>
              <View style={styles.input_container}>
                <AppTextInput
                  label="Enter Your Full Name"
                  value={name}
                  activeColor={Colors.primaryCyanColor}
                  containerStyle={styles.input}
                  returnKeyType="done"
                  onChangeText={(text) => setName(text)}
                  placeholderTextColor={Colors.textSecondaryDark}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View>
              <AppTouchableButton
                isLoading={loading}
                text="Done"
                textStyle={styles.btn_text}
                style={styles.btn_style}
                onPress={() => {
                  handleSubmit();
                }}
              />
              <Text style={styles.footerText}>
                Built for curious minds, cautious spenders, and confident
                futures.
              </Text>
            </View>
          </View>
        </AppSafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main_container: { flex: 1, paddingTop: 200 },
  avatar_container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: verticalScale(60),
    alignSelf: "center",
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(50),
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    gap: 40,
    padding: normalize(20),
    paddingBottom: verticalScale(30),
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
  },
  input_container: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },

  btn_style: {
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(100),
  },
  btn_text: {
    color: "white",
    fontSize: moderateScale(18),
    fontFamily: "Poppins",
  },
  title: {
    fontSize: 24,
    color: Colors.primaryCyanColor,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 5,
  },

  footerText: {
    textAlign: "center",
    fontSize: moderateScale(12),
    color: Colors.textSecondaryLight,
    fontFamily: "Quicksand",
    marginTop: moderateScale(6),
  },
});

export default PersonalDetailsScreen;
