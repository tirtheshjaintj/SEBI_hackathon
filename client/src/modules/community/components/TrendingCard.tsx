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
            uri: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202304/untitled-2_23-sixteen_nine.jpg?size=948:533",
          }}
          style={styles.avatar}
        />

        {/* Bank Info + Message */}
        <View style={{ flex: 1 }}>
          {/* Name + Verified */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={styles.name}>{t("SEBI (Official)")}</Text>
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
              {t(
                "Be cautious investors about fraudulent stock tips circulating on WhatsApp and Telegram groups. Investors should only rely on registered intermediaries and verify details on SEBI’s official website or app before making any financial decisions."
              )}
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
    backgroundColor: Colors.secColor,
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
    resizeMode: "cover",
    backgroundColor: Colors.whiteDim,
  },
});

export default TrendingCard;
