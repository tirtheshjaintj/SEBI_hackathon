import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import YoutubeVideoPlayer from "@/src/components/videoPlayers/YoutubeVideoPlayer";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import topicsByLocale from "./videos";

import Colors from "@/src/theme/colors";
import { languageType } from "@/src/types/constants";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

interface Item {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

const Topics = () => {
  const { i18n, t } = useTranslation();
  const locale = i18n.language as languageType;
  const topics: Item[] = topicsByLocale[locale];

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <View style={styles.videoWrapper}>
        <YoutubeVideoPlayer videoLink={item.url} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <CommonToolbar title={t("Tutorial Topics")} />
      <FlatList
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Subtle vertical gradient background feel
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingVertical: moderateScale(16),
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScale(10),
    // borderBottomRightRadius: moderateScale(16),
    // borderBottomLeftRadius: moderateScale(16),
    marginBottom: moderateScale(20),
    paddingBottom: moderateScale(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    gap: moderateScale(10),
    elevation: 2,
    marginHorizontal: moderateScale(22),
  },
  title: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    lineHeight: moderateScale(20),
    color: Colors.textGraySecondary,
  },
  videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    // borderRadius: moderateScale(12),
    overflow: "hidden",
    // borderWidth: 1,
  },
  description: {
    fontSize: moderateScale(15),
    color: Colors.textSecondaryLight,
    fontFamily: "Quicksand-SemiBold",
    lineHeight: moderateScale(18),
  },
  textWrapper: {
    paddingHorizontal: moderateScale(16),
    gap: verticalScale(6),
  },
});

export default Topics;
