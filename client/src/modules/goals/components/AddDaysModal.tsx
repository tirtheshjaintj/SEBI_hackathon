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
  onSubmit: (days: number) => void;
}

export default function AddDaysModal({ visible, onClose, onSubmit }: Props) {
  const { t } = useTranslation();
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = () => {
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;
    const total = y * 365 + m * 30 + d;

    if (total > 0) {
      onSubmit(total);
      setYears("");
      setMonths("");
      setDays("");
    }
  };

  const isSubmitDisabled = !years && !months && !days;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("Extend Deadline")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={moderateScale(20)} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            {t("Add extra time to your goal")}
          </Text>

          <View style={styles.durationContainer}>
            <View style={styles.durationInputWrapper}>
              <Text style={styles.durationLabel}>{t("Years")}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  style={styles.durationInput}
                  value={years}
                  onChangeText={setYears}
                />
                <Ionicons
                  name="calendar-outline"
                  size={moderateScale(16)}
                  color={Colors.primaryCyanColor}
                />
              </View>
            </View>

            <View style={styles.durationInputWrapper}>
              <Text style={styles.durationLabel}>{t("Months")}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  style={styles.durationInput}
                  value={months}
                  onChangeText={setMonths}
                />
                <Ionicons
                  name="calendar-outline"
                  size={moderateScale(16)}
                  color={Colors.primaryCyanColor}
                />
              </View>
            </View>

            <View style={styles.durationInputWrapper}>
              <Text style={styles.durationLabel}>{t("Days")}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  style={styles.durationInput}
                  value={days}
                  onChangeText={setDays}
                />
                <Ionicons
                  name="calendar-outline"
                  size={moderateScale(16)}
                  color={Colors.primaryCyanColor}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
              <Text style={styles.secondaryText}>{t("Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                isSubmitDisabled && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
            >
              <Ionicons
                name="time-outline"
                size={moderateScale(20)}
                color="#FFFFFF"
              />
              <Text style={styles.primaryText}>{t("Extend")}</Text>
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
    marginBottom: verticalScale(8),
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Regular",
    color: "#6B7280",
    marginBottom: verticalScale(20),
  },
  closeButton: {
    padding: moderateScale(4),
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(12),
    marginBottom: verticalScale(24),
  },
  durationInputWrapper: {
    flex: 1,
  },
  durationLabel: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
    color: "#6B7280",
    marginBottom: verticalScale(8),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(12),
    backgroundColor: "#F9FAFB",
    paddingHorizontal: moderateScale(12),
  },
  durationInput: {
    flex: 1,
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#111827",
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
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  secondaryText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
  },
});
