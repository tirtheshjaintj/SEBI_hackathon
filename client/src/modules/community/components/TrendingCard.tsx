import Colors from "@/src/theme/colors";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

const TrendingCard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const { t } = useTranslation();
  return (
    <View style={styles.trendingCard}>
      <Text style={styles.trendingTitle}>{t("Trending")}</Text>

      <View style={styles.trendingInfo}>
        {/* Avatar */}
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl2yfsLW_JHPSxKHWUKqDj3ZhvAX-Ob41Hg&s",
          }}
          style={styles.avatar}
        />

        {/* Bank Info + Message */}
        <View style={{ flex: 1 }}>
          {/* Name + Verified */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={styles.name}>{t("Punjab & Sind Bank")}</Text>
            <MaterialIcons
              name="verified"
              size={20}
              color={Colors.darkYellow}
            />
          </View>

          {/* Thread Text */}
          <View>
            <Text
              style={styles.threadText}
              numberOfLines={expanded ? undefined : 4}
            >
              {t("Messages are often sent by scammers attempting to trick you into revealing personal information or sending money. Be wary of any unsolicited text messages asking for sensitive information or urging you to click on suspicious links.")}
            </Text>

            <Text
              style={styles.readMore}
              onPress={() => setExpanded((prev) => !prev)}
            >
              {expanded ? t("Read less") : t("...Read more")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "600",
    fontSize: normalize(14),
    color: Colors.whiteDim,
  },
  trendingCard: {
    backgroundColor: Colors.primaryCyanColor,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
  },
  trendingTitle: {
    color: Colors.white,
    fontWeight: "700",
    marginBottom: verticalScale(6),
  },
  readMore: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: verticalScale(2),
    fontFamily: "Quicksand-SemiBold",
  },
  trendingInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  threadText: {
    color: Colors.white,
    fontSize: normalize(14),
    marginTop: scale(4),
    fontFamily: "Quicksand-Medium",
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
});

export default TrendingCard;
