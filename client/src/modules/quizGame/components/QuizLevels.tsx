import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const BOX_WIDTH = (width - moderateScale(16 * 3)) / 2;

const QuizLevels = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore((state) => state);
  const renderLevel = ({ item }: { item: any }) => {
    const isUnlocked = user.level >= item.level;
    return (
      <View style={styles.levelBoxWrapper}>
        <TouchableOpacity
          disabled={!isUnlocked}
          onPress={() => {
            if (isUnlocked) router.push(`/quiz/${item.level}`);
          }}
          activeOpacity={isUnlocked ? 0.8 : 1}
          style={[
            styles.levelBox,
            isUnlocked ? styles.unlockedBox : styles.lockedBox,
          ]}
        >
          {/* Level Badge */}
          <View style={styles.levelBadge}>
            <Image
              source={require("@/assets/images/global/level.png")}
              style={{ width: scale(55), height: scale(55) }}
            />
          </View>

          {/* Level Title */}
          <Text numberOfLines={2} style={styles.levelText}>
            {item.topic}
          </Text>

          {/* Questions Count */}
          <View style={styles.questionsContainer}>
            <Ionicons
              name="document-text-outline"
              size={14}
              color={Colors.textSecondaryDark}
            />
            <Text style={styles.questionsText}>
              {item.questionCount} {t("questions")}
            </Text>
          </View>

          {/* Progress Bar */}
          {item.reAttempt ? (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(item.pointsScored / item.totalPoints) * 100}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {item.pointsScored}/{item.totalPoints} {t("pts")}
              </Text>
            </View>
          ) : (
            <Text style={styles.pointsText}>
              {item.totalPoints}
              {t(" points available")}
            </Text>
          )}

          {/* Lock State */}
          {!isUnlocked && (
            <View style={styles.lockContainer}>
              <View style={styles.lockCircle}>
                <Ionicons name="lock-closed" size={16} color="#fff" />
              </View>
              <Text style={styles.lockText}>
                {t("Complete previous level")}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{ gap: moderateScale(16) }}
        contentContainerStyle={{
          gap: moderateScale(16),
          paddingBottom: moderateScale(24),
        }}
        renderItem={renderLevel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayTint,
    flex: 1,
    padding: moderateScale(16),
  },
  levelBoxWrapper: {
    width: BOX_WIDTH,
    height: verticalScale(180),
    position: "relative",
    gap: moderateScale(8),
    marginBottom: moderateScale(20),
  },
  levelBox: {
    flex: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    gap: moderateScale(6),
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  unlockedBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.white,
  },
  lockedBox: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  levelBadge: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: moderateScale(10),
  },
  levelBadgeText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(14),
  },
  levelText: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: Colors.textPrimary,
  },
  questionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: moderateScale(8),
  },
  questionsText: {
    fontSize: moderateScale(12),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
    marginLeft: moderateScale(4),
  },
  progressContainer: {
    // marginBottom: moderateScale(8),
  },
  progressBar: {
    height: moderateScale(6),
    backgroundColor: "#e0e0e0",
    borderRadius: moderateScale(3),
    overflow: "hidden",
    // marginBottom: moderateScale(4),
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primaryBackground,
    borderRadius: moderateScale(3),
  },
  progressText: {
    fontSize: moderateScale(10),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
  },
  pointsText: {
    fontSize: moderateScale(12),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
    lineHeight: moderateScale(16),
  },
  lockContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: moderateScale(16),
  },
  lockCircle: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: Colors.primaryCyanColor,
    justifyContent: "center",
    alignItems: "center",
    // bottom: 8,
    marginBottom: moderateScale(8),
  },
  lockText: {
    fontSize: moderateScale(10),
    color: Colors.white,
    fontFamily: "Quicksand-Medium",
    textAlign: "center",
    bottom: 8,
  },
});

export default QuizLevels;
