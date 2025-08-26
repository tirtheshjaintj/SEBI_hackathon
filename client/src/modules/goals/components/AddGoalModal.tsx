import axiosInstance from "@/src/apis/axiosInstance";
import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
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
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { goalCategories } from "../constants";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function AddGoalModal({ visible, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(goalCategories[0]);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [targetYears, setTargetYears] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleCreate = async () => {
    if (loading) return;
    setLoading(true);
    if (!title.trim()) {
      Toast.show({ type: "error", text1: t("Please enter a goal title.") });
      return;
    }
    if (!description.trim()) {
      Toast.show({ type: "error", text1: t("Please enter a description.") });
      return;
    }
    if (
      !targetAmount.trim() ||
      isNaN(Number(targetAmount)) ||
      Number(targetAmount) <= 0
    ) {
      Toast.show({
        type: "error",
        text1: t("Please enter a valid target amount."),
      });
      return;
    }

    const years = parseInt(targetYears || "0");
    const months = parseInt(targetMonths || "0");
    const d = parseInt(days) || 0;
    if (
      isNaN(years) ||
      isNaN(months) ||
      (years === 0 && months === 0 && d === 0)
    ) {
      Toast.show({ type: "error", text1: t("Please enter a valid duration.") });
      return;
    }

    const totalDays = years * 365 + months * 30 + d;

    try {
      await axiosInstance.post("/goal", {
        title,
        description,
        targetAmount: Number(targetAmount),
        targetDays: totalDays,
        category: selectedCategory.value,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setTargetAmount("");
      setTargetYears("");
      setTargetMonths("");
      setDays("");
      setSelectedCategory(goalCategories[0]);
      onAdd();
      onClose();

      Toast.show({ type: "success", text1: t("Goal created successfully!") });
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: t("Failed to create goal. Please try again."),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <CommonToolbar title={t("Add New Goal")} onBackPress={onClose} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="pricetag-outline"
                    size={moderateScale(16)}
                    color={Colors.primaryCyanColor}
                  />
                  <Text style={styles.label}>{t("Goal Title")}</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                  placeholder={t("Dream Home")}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="document-text-outline"
                    size={moderateScale(16)}
                    color={Colors.primaryCyanColor}
                  />
                  <Text style={styles.label}>{t("Description")}</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholderTextColor="#9CA3AF"
                  placeholder={t("Describe your goal") + "..."}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="flag-outline"
                    size={moderateScale(16)}
                    color={Colors.primaryCyanColor}
                  />
                  <Text style={styles.label}>{t("Target Amount")}</Text>
                </View>
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={[styles.input, { paddingLeft: scale(30) }]}
                    placeholderTextColor="#9CA3AF"
                    placeholder="15000"
                    keyboardType="numeric"
                    value={targetAmount}
                    onChangeText={setTargetAmount}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={moderateScale(16)}
                    color={Colors.primaryCyanColor}
                  />
                  <Text style={styles.label}>{t("Target Duration")}</Text>
                </View>
                <View style={styles.durationRow}>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={targetYears}
                      onChangeText={setTargetYears}
                    />
                    <Text style={styles.durationLabel}>
                      <Ionicons name="time-outline" size={moderateScale(12)} />{" "}
                      {t("Years")}
                    </Text>
                  </View>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={targetMonths}
                      onChangeText={setTargetMonths}
                    />
                    <Text style={styles.durationLabel}>
                      <Ionicons name="time-outline" size={moderateScale(12)} />{" "}
                      {t("Months")}
                    </Text>
                  </View>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={days}
                      onChangeText={setDays}
                    />
                    <Text style={styles.durationLabel}>
                      <Ionicons name="time-outline" size={moderateScale(12)} />{" "}
                      {t("Days")}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons
                    name="grid-outline"
                    size={moderateScale(16)}
                    color={Colors.primaryCyanColor}
                  />
                  <Text style={styles.label}>{t("Category")}</Text>
                </View>
                <TouchableOpacity
                  style={styles.selector}
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <View style={styles.selectorContent}>
                    <Ionicons
                      name={selectedCategory.icon as any}
                      size={moderateScale(20)}
                      color={Colors.primaryCyanColor}
                      style={{ marginRight: scale(8) }}
                    />
                    <Text style={styles.selectorText}>
                      {t(selectedCategory.label)}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-down"
                    size={moderateScale(20)}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.createButton}
              onPress={handleCreate}
            >
              <Ionicons
                name="add-circle-outline"
                size={moderateScale(20)}
                color="#FFFFFF"
              />
              <Text style={styles.createButtonText}>{t("Create Goal")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && <LoaderFullScreen />}

        {/* Category Picker Modal */}
        <Modal visible={categoryModalVisible} animationType="fade" transparent>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <Ionicons
                  name="grid-outline"
                  size={moderateScale(20)}
                  color={Colors.primaryCyanColor}
                />
                <Text style={styles.pickerTitle}>{t("Select Category")}</Text>
              </View>
              <FlatList
                data={goalCategories}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setSelectedCategory(item);
                      setCategoryModalVisible(false);
                    }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={moderateScale(20)}
                      color={Colors.primaryCyanColor}
                      style={{ marginRight: scale(10) }}
                    />
                    <Text style={styles.pickerItemText}>{t(item.label)}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  toolbar: {
    backgroundColor: Colors.primaryCyanColor,
    height: verticalScale(56),
    paddingHorizontal: moderateScale(16),
  },
  toolbarTitle: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: verticalScale(80),
  },
  formContainer: {
    padding: moderateScale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(16),
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
    gap: scale(8),
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    color: "#374151",
  },
  input: {
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Regular",
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  textArea: {
    height: verticalScale(100),
    textAlignVertical: "top",
  },
  amountInputContainer: {
    position: "relative",
  },
  currencySymbol: {
    position: "absolute",
    left: scale(12),
    top: verticalScale(12),
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#4B5563",
    zIndex: 1,
  },
  durationRow: {
    flexDirection: "row",
    gap: scale(8),
  },
  durationInput: {
    flex: 1,
  },
  durationLabel: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Regular",
    color: "#6B7280",
    marginTop: verticalScale(4),
    textAlign: "center",
  },
  selector: {
    borderWidth: moderateScale(1),
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
  },
  selectorContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectorText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#111827",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(16),
    backgroundColor: "#FFFFFF",
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E5E7EB",
  },
  createButton: {
    backgroundColor: Colors.primaryCyanColor,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(14),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },
  createButtonText: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "80%",
    maxHeight: "60%",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
  },
  pickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(16),
    gap: scale(8),
  },
  pickerTitle: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#F3F4F6",
  },
  pickerItemText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#374151",
    lineHeight: verticalScale(18),
  },
});
