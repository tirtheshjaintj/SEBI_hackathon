import React, { Dispatch, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { addBudget } from "../services/budget";
import AppTextInput from "@/src/components/formElements/AppTextInput";
import AppTouchableButton from "@/src/components/buttons/AppTouchableButton";
import Toast from "react-native-toast-message";
import Slider from "@react-native-community/slider";
import Colors from "@/src/theme/colors";
import { router } from "expo-router";
import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import { useTranslation } from "react-i18next";


const AddBudgetModal = ({
  closeModal,
  refreshData,
}: {
  closeModal?: Dispatch<React.SetStateAction<boolean>>;
  refreshData?: () => void;
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(1000);
  const {t} = useTranslation()
  const budgetRanges = [
    { min: 0, max: 500, label: t("Small") },
    { min: 500, max: 2000, label: t("Medium") },
    { min: 2000, max: 5000, label: t("Large") },
    { min: 5000, max: 10000, label: t("Premium") },
  ];

  const handleRangeSelect = (index: number) => {
    const range = budgetRanges[index];
    setSelectedRange(index);
    setAmount(((range.min + range.max) / 2).toString());
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setAmount(value.toFixed(2));
  };

  const addBudgetHandler = async () => {
    if (!amount) return;
    if (parseInt(amount) <= 0) {
      Toast.show({
        type: "error",
        text1: t("Amount should be greater than 0"),
      });
      return;
    }

    setLoading(true);
    await addBudget({ amount: parseFloat(amount) })
      .then((res) => {
        Toast.show(
          res?.success
            ? {
                type: "success",
                text1: "Budget added successfully",
                text2: `₹${amount} budget set`,
              }
            : {
                type: "error",
                text1: "Failed to add budget",
                text2: "Please try again",
              }
        );
        refreshData && refreshData();
        closeModal && closeModal(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("Set Your Budget")}</Text>
        <Text style={styles.subtitle}>
          {t("Choose a range or specify custom amount")}
        </Text>

        {/* Range Selector */}
        <View style={styles.rangeContainer}>
          {budgetRanges.map((range, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleRangeSelect(index)}
            >
              <View
                style={[
                  styles.rangeItem,
                  selectedRange === index && styles.selectedRangeItem,
                ]}
              >
                <Text
                  style={[
                    styles.rangeLabel,
                    selectedRange === index && styles.selectedRangeLabel,
                  ]}
                >
                  {range.label}
                </Text>
                <Text
                  style={[
                    styles.rangeAmount,
                    selectedRange === index && styles.selectedRangeAmount,
                  ]}
                >
                  ₹{range.min}-₹{range.max}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t("OR")}</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Custom Amount */}
        <View style={styles.customAmountContainer}>
          <Text style={styles.sectionTitle}>{t("Custom Amount")}</Text>

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10000}
            step={50}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={Colors.primaryCyanColor}
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor={Colors.primaryCyanColor}
          />

          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <AppTextInput
              containerStyle={styles.amountInput}
              label=""
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                if (!isNaN(parseFloat(text))) {
                  setSliderValue(parseFloat(text));
                }
              }}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              closeModal && closeModal(false);
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>{t("Cancel")}</Text>
          </TouchableOpacity>
          <AppTouchableButton
            isLoading={loading}
            loaderSize="small"
            style={{ minWidth: 150 }}
            text={t("Set Budget")}
            textStyle={{ fontSize: 15, fontFamily: "Quicksand-Bold" }}
            onPress={addBudgetHandler}
          />
        </View>
        {loading && <LoaderFullScreen />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    margin: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 16,
  },
  rangeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rangeItem: {
    width: "48%",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedRangeItem: {
    backgroundColor: Colors.bgGreenTint,
    borderColor: Colors.primaryCyanColor,
  },
  rangeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495E",
    textAlign: "center",
  },
  selectedRangeLabel: {
    color: Colors.primaryCyanColor,
  },
  rangeAmount: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 2,
  },
  selectedRangeAmount: {
    color: Colors.primaryCyanColor,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#7F8C8D",
    fontSize: 12,
  },
  customAmountContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 12,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 20,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
    fontSize: 18,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#7F8C8D",
    fontSize: 16,
    fontFamily: "Quicksand-SemiBold",
  },
  confirmButton: {
    flex: 1,
    fontFamily: "Quicksand-SemiBold",
  },
});

export default AddBudgetModal;
