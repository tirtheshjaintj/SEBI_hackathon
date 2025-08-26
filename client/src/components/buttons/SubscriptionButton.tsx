import { HTTP_STATUS_CODES } from "@/src/constants/constant";
import {
  getCheckoutOrderId,
  verifyPayment,
} from "@/src/services/payment/payment";
import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { userAvatar } from "@/src/utils/user/user";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import Toast from "react-native-toast-message";
import Loader from "../loaders/Loader";
import ModalWrapper from "../modal/ModalWrapper";
import AppLinearGradient from "../shared/AppLinearGradient";
import AppTouchableButton from "./AppTouchableButton";
import { tags } from "react-native-svg/lib/typescript/xmlTags";

const SubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useAuthStore((state) => state);
  const { t } = useTranslation();

  const handleUpgradeToPremium = useCallback(async () => {
    try {
      if (user.isPremium) {
        return;
      }
      setLoading(true);
      const { res, status } = (await getCheckoutOrderId({
        amount: 999,
      })) as any;

      // console.log({ res, status });
      if (res?.isAlreadySubscribed && status === HTTP_STATUS_CODES.OK) {
        setUser({ user: { ...user, isPremium: true } });
        Toast.show({
          type: "error",
          text1: "You are already a premium user",
        });
        setLoading(false);
        return;
      }
      if (res && status === HTTP_STATUS_CODES.CREATED) {
        const orderId = res?.response.id;
        const receiptId = res?.response.receipt;

        const options = {
          description: "Lifetime Subscription",
          image: user?.avatar || userAvatar,
          currency: "INR",
          key: process.env.EXPO_PUBLIC_RAZORPAY_TEST_KEY,
          amount: "999",
          name: user.name,
          order_id: orderId,
          prefill: {
            email: user?.email,
            contact: "",
            name: user?.name,
          },
          theme: { color: Colors.primaryCyanColor },
        };

        const paymentResponse = await RazorpayCheckout.open(options);

        if (paymentResponse) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            paymentResponse;
          const { res: veryficationResponse, status } = (await verifyPayment({
            data: {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
              receiptId: receiptId,
            },
          })) as any;

          if (veryficationResponse && status === HTTP_STATUS_CODES.OK) {
            Toast.show({
              type: "success",
              text1: "Payment Success",
            });
            setUser({ user: { ...user, isPremium: true } });
          } else {
            Toast.show({
              type: "error",
              text1: "Payment Failed",
            });
          }
        }
      }
    } catch (error) {
      // console.error("error", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  }, [setUser, user]);

  // console.log(user);

  return (
    <>
      <AppLinearGradient
        colors={[Colors.primaryCyanColor, Colors.darkYellow]}
        style={styles.upgrade_btn}
      >
        <TouchableOpacity
          disabled={loading || user.isPremium}
          activeOpacity={0.8}
          onPress={() => {
            if (user.isPremium) {
              return;
            }
            setShowModal(true);
          }}
        >
          {loading ? (
            <Loader loaderColor="white" size="small" />
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              {!user.isPremium ? (
                <>
                  <Text style={styles.upgrade_btn_text}>{t("Get Premium")}</Text>
                  <FontAwesome name="diamond" size={12} color="white" />
                </>
              ) : (
                <>
                  <Text style={styles.upgrade_btn_text}>{t("Premium Active")}</Text>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={Colors.white}
                  />
                </>
              )}
            </View>
          )}
        </TouchableOpacity>
      </AppLinearGradient>
      <ModalWrapper
        animationType="slide"
        visible={showModal}
        onClose={() => setShowModal(false)}
        disableTouchClose
      >
        <View style={styles.premiumCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.premiumTitle}>{t("Unlock Premium Features")}</Text>
            <Text style={styles.subtitle}>
              {t("Upgrade to enjoy these exclusive benefits")}
            </Text>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{t("Ad-free experience")}</Text>
            </View>

            <View style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{t("Advanced Budget analytics")}</Text>
            </View>

            <View style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{t("Priority customer support")}</Text>
            </View>

            <View style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{t("Exclusive Simulations")}</Text>
            </View>

            <View style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.green}
              />
              <Text style={styles.featureText}>{t("Advanced AI Scam Detection")}</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹999</Text>
            <Text style={styles.billingText}>
              {t("One time payment lifetime access")}
            </Text>
          </View>

          {/* Continue Button */}
          <AppTouchableButton
            isLoading={loading}
            disabled={loading}
            loaderSize="small"
            text={t("Continue to Payment")}
            style={styles.continueButton}
            onPress={handleUpgradeToPremium}
          />
        </View>
      </ModalWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  upgrade_btn: {
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    minWidth: 120,
    justifyContent: "center",
    borderColor: Colors.divider,
    borderWidth: 0.5,
  },
  upgrade_btn_text: {
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
    color: Colors.white,
    lineHeight: 18,
    fontSize: moderateScale(14),
  },

  premiumCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    marginBottom: verticalScale(16),
    alignItems: "center",
  },
  premiumTitle: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
  },
  subtitle: {
    fontSize: moderateScale(12),
    maxWidth: "80%",
    textAlign: "center",
    color: Colors.textSecondaryLight,
  },
  featuresContainer: {
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryDark,
  },
  priceContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  price: {
    fontSize: 22,
    fontFamily: "Poppins-SemiBold",
    color: Colors.primaryCyanColor,
  },
  billingText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: Colors.primaryCyanColor,
    padding: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  footerNote: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
});

export default SubscriptionButton;
