import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import ProfileHeader from "../components/ProfileHeader";
import LevelUpModal from "../components/modals/LevelUpModal";
import QuizLevelsShimmer from "../components/shimmers/QuizLevelShimmer";
import QuizLevels from "../components/QuizLevels";

const QuizScreen = ({
  data,
  loading,
  refreshHanlder,
}: {
  data?: any;
  loading?: boolean;
  refreshHanlder: () => Promise<void>;
}) => {
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleCloseLevelUpModal = () => {
    setShowLevelUpModal(false);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshHanlder().finally(() => setRefreshing(false));
  }, [refreshHanlder]);

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar style="light" translucent /> */}
      <AppLinearGradient
        colors={[Colors.secondaryCyanColor, Colors.primaryCyanColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.4]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <ProfileHeader data={data} />
      </AppSafeAreaView>
      <ScrollView
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
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <AppSafeAreaView style={{ paddingTop: 0, flex: 1 }}>
          {loading ? <QuizLevelsShimmer /> : <QuizLevels data={data} />}
        </AppSafeAreaView>
      </ScrollView>

      <LevelUpModal
        level={1}
        visible={showLevelUpModal}
        onClose={handleCloseLevelUpModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgGreenTint,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default QuizScreen;
