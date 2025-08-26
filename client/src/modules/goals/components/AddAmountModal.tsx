import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function AddAmountModal({ visible, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState("");
  const { t } = useTranslation();

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (!isNaN(amt) && amt > 0) {
      onSubmit(amt);
      setAmount("");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("Add Contribution")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={moderateScale(20)} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="wallet-outline"
              size={moderateScale(24)}
              color={Colors.primaryCyanColor}
              style={styles.currencyIcon}
            />
            <TextInput
              placeholder={t("Enter amount")}
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={styles.currencyText}>₹</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryText}>{t("Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleAdd}
              disabled={
                !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0
              }
            >
              <Text style={styles.primaryText}>{t("Add Amount")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(16),
  },
  modalContainer: {
    width: "100%",
    maxWidth: scale(320),
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(20),
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
  },
  closeButton: {
    padding: moderateScale(4),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(12),
    backgroundColor: "#F9FAFB",
    marginBottom: verticalScale(24),
    overflow: "hidden",
  },
  currencyIcon: {
    marginLeft: moderateScale(16),
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(16),
    fontSize: moderateScale(16),
    fontFamily: "Quicksand-Medium",
    color: "#111827",
  },
  currencyText: {
    paddingRight: moderateScale(16),
    fontSize: moderateScale(16),
    fontFamily: "Quicksand-Medium",
    color: "#6B7280",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(12),
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryCyanColor,
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    gap: scale(8),
    opacity: 1,
  },
  primaryText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  secondaryText: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
  },
});
