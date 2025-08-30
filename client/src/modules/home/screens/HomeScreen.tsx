import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import React, { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MainSection from "../components/MainSection";

import ModalWrapper from "@/src/components/modal/ModalWrapper";
import { updateUserStreak } from "@/src/services/user/user";
import useAuthStore from "@/src/store/authSlice";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Image } from "expo-image";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import StreakModal from "../components/modals/StreakModal";
import { StatusBar } from "expo-status-bar";

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  data: any;
}
const HomeScreen = ({ refreshing, onRefresh, data }: Props) => {
  const glow = useSharedValue(1);
  const { streak, setStreak } = useAuthStore((state) => state);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    handleUpdateUserStreak();
    glow.value = withRepeat(withTiming(1.1, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glow.value }],
  }));

  const handleUpdateUserStreak = async () => {
    const { res: streakRes, status } = (await updateUserStreak()) as any;
    // console.log({ streakRes, status });
    if (streakRes && status === 200) {
      setTimeout(() => {
        setStreak({ streak: streakRes.streakUpdated ?? false });
        // setStreak({ streak: true });
      }, 300);
      setUser({ user: { ...user, streak: streakRes.count ?? 0 } });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <AppLinearGradient
        colors={[
          Colors.primaryCyanColor,
          Colors.gradientCyanSecondary,
          Colors.white,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2, 0.3]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
      </AppSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.main_container}
        refreshControl={
          <RefreshControl
            tintColor={Colors.primaryCyanColor}
            progressViewOffset={45}
            progressBackgroundColor={Colors.white}
            colors={[Colors.primaryCyanColor]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <AppSafeAreaView style={{ paddingTop: 0, flex: 1 }}>
          <MainSection data={data} />
        </AppSafeAreaView>
      </ScrollView>

      {/* Floating AI Bot Button */}
      <Animated.View style={[styles.fab, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/chatbot")}
        >
          <Image
            source={require("@/assets/images/bot.png")}
            contentFit="cover"
            style={{
              width: moderateScale(70),
              height: moderateScale(70),
              borderRadius: moderateScale(30),
            }}
          />
          {/* <MaterialCommunityIcons name="robot-outline" size={37} color="#fff" /> */}
        </TouchableOpacity>
      </Animated.View>

      {/* <FabTabs /> */}

      {streak && (
        <ModalWrapper
          visible={streak}
          animationType="slide"
          onClose={() => setStreak({ streak: false })}
        >
          <StreakModal visible={streak} currentStreak={user.streak} />
        </ModalWrapper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fab: {
    position: "absolute",
    overflow: "hidden",
    right: scale(20),
    bottom: verticalScale(60),
    width: scale(55),
    height: scale(55),
    padding: 10,
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.whiteDim,
  },
});

export default HomeScreen;
