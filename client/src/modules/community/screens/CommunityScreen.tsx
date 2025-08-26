import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import CommunityMain from "../components/CommunityMain";

const CommunityScreen = ({
  data,
  refreshHanlder,
}: {
  data: any;
  refreshHanlder: () => Promise<void>;
}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshHanlder().finally(() => setRefreshing(false));
  }, [refreshHanlder]);
  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar style="light" translucent /> */}
      <AppLinearGradient
        colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
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
          <CommunityMain data={data} />
        </AppSafeAreaView>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push("/post/new");
        }}
        style={styles.fab}
      >
        <FontAwesome name="pencil" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    overflow: "hidden",
    bottom: verticalScale(60),
    backgroundColor: Colors.primaryCyanColor,
    width: scale(60),
    height: scale(60),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CommunityScreen;
