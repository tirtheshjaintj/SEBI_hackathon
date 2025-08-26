import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";

type RewardItem = {
  _id: string;
  name: string;
  description: string;
  redeemPoints: number;
  image: any;
  status?: string;
  isRedeemed?: boolean;
  quantity?: number;
};

const MerchandiseScreen = ({
  data,
  refreshHanlder,
}: {
  data: RewardItem[];
  refreshHanlder: () => Promise<void>;
}) => {
  const [selectedItem, setSelectedItem] = useState<RewardItem | null>(null);
  const { user } = useAuthStore((state) => state);
  const [userPoints, setUserPoints] = useState(user?.points);
  const { t } = useTranslation();
  const handleRedeem = (item: RewardItem) => {
    if (item.status === "active" && !item.isRedeemed) {
      if (userPoints >= item.redeemPoints) {
        setSelectedItem(item);

        // Simulate API redemption
        setTimeout(() => {
          setUserPoints((prev: number) => prev - item.redeemPoints);
          setSelectedItem(null);
        }, 1500);
      }
    } else {
      Toast.show({
        type: "info",
        text1: t("Reward already redeemed or not active"),
      });
    }
  };

  const renderItem = ({ item }: { item: RewardItem }) => (
    <View
      style={[
        styles.card,
        userPoints < item.redeemPoints && styles.disabledCard,
      ]}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>

          <View style={styles.pointsContainer}>
            <Image
              source={require("@/assets/images/global/sheild.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.pointsText}>
              {item.redeemPoints.toLocaleString()} pts
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.redeemButton,
          userPoints < item.redeemPoints && styles.disabledButton,
        ]}
        onPress={() => handleRedeem(item)}
        disabled={userPoints < item.redeemPoints}
        activeOpacity={0.8}
      >
        <Text style={styles.redeemButtonText}>
          {userPoints >= item.redeemPoints ? t("Redeem Now") : t("Not Enough Points")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <AppSafeAreaView style={styles.container}>
      <CommonToolbar title={t("Rewards Store")} />
      <Animated.View entering={FadeInUp.duration(800)} style={styles.header}>
        <View style={styles.pointsDisplay}>
          <Image
            source={require("@/assets/images/global/sheild.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.pointsTextLarge}>
            {userPoints.toLocaleString()}
          </Text>
          <Text style={styles.pointsLabel}>{t("points available")}</Text>
        </View>
      </Animated.View>
      <FlatList
        data={data && data.sort((a, b) => a.redeemPoints - b.redeemPoints)}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refreshHanlder();
            }}
            tintColor={Colors.primaryCyanColor}
          />
        }
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {selectedItem && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeInDown.duration(300)}
          style={styles.successModal}
        >
          <View style={styles.successContent}>
            <Ionicons name="checkmark-circle" size={60} color={Colors.green} />
            <Text style={styles.successTitle}>{t("Redemption Successful!")}</Text>
            <Text style={styles.successText}>
              {t("You have redeemed")} {selectedItem.name} {t("for")} {" "}
              {selectedItem.redeemPoints.toLocaleString()} {t("points")}.
            </Text>
            <Text style={styles.successText}>
              {t("Check your email for details")}.
            </Text>
          </View>
        </Animated.View>
      )}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 16,
    // paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textSecondaryDark,
    marginBottom: 15,
  },
  pointsDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
  },
  pointsTextLarge: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textSecondaryDark,
    marginLeft: 5,
    marginRight: 5,
  },
  pointsLabel: {
    fontSize: 16,
    color: Colors.textSecondaryDark,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    paddingTop: 15,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  disabledCard: {
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 15,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: Colors.textSecondaryLight,
  },
  cardText: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textGraySecondary,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.textSecondaryLight,
    marginBottom: 10,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 16,
    color: Colors.primaryCyanColor,
    marginLeft: 5,
    fontWeight: "600",
  },
  redeemButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primaryCyanColor,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.textSecondaryVeryLight,
  },
  redeemButtonText: {
    color: Colors.primaryCyanColor,
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },
  successModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successContent: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textSecondaryDark,
    marginVertical: 15,
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    color: Colors.textSecondaryLight,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default MerchandiseScreen;
