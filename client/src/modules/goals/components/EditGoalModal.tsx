import axiosInstance from "@/src/apis/axiosInstance";
import { Ionicons } from "@expo/vector-icons";
import { addDays, differenceInDays, intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
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

import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { goalCategories, goalStatuses } from "../constants";

interface Props {
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
  goal: any;
}

export default function EditGoalModal({
  visible,
  onClose,
  onUpdate,
  goal,
}: Props) {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [targetAmount, setTargetAmount] = useState(
    goal.targetAmount.toString()
  );
  const [targetDays, setTargetDays] = useState(goal.targetDays.toString());
  const [selectedCategory, setSelectedCategory] = useState(
    goalCategories.find((c) => c.value === goal.category) || goalCategories[0]
  );
  const [currentAmount, setCurrentAmount] = useState(
    goal.currentAmount.toString()
  );
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [status, setStatus] = useState(goal?.status || "active");
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const { t } = useTranslation();
  const [targetYears, setTargetYears] = useState("");
  const [targetMonths, setTargetMonths] = useState("");
  const [targetDaysRemainder, setTargetDaysRemainder] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setTargetAmount(goal.targetAmount.toString());
      setCurrentAmount(goal.currentAmount.toString());
      setSelectedCategory(
        goalCategories.find((c) => c.value === goal.category) ||
          goalCategories[0]
      );
      setStatus(goal.status || "active");

      const totalDays = parseInt(goal.targetDays);
      const start = new Date(2000, 0, 1);
      const end = addDays(start, totalDays);
      const duration = intervalToDuration({ start, end });
      setTargetYears(duration.years?.toString() || "0");
      setTargetMonths(duration.months?.toString() || "0");
      setTargetDaysRemainder(duration.days?.toString() || "0");
    }
  }, [goal]);

  const handleUpdate = async () => {
    if (loading) return; // Prevent multiple submissions
    setLoading(true);
    const years = parseInt(targetYears || "0");
    const months = parseInt(targetMonths || "0");
    const days = parseInt(targetDaysRemainder || "0");

    const start = new Date(2000, 0, 1);
    const end = new Date(2000 + years, months, 1 + days);
    const totalDays = differenceInDays(end, start);

    if (!title.trim()) {
      alert(t("Please enter a goal title."));
      return;
    }
    if (!description.trim()) {
      alert(t("Please enter a description."));
      return;
    }
    if (
      !targetAmount.trim() ||
      isNaN(Number(targetAmount)) ||
      Number(targetAmount) <= 0
    ) {
      alert(t("Please enter a valid target amount."));
      return;
    }
    if (totalDays <= 0) {
      alert(t("Please enter a valid number of target days."));
      return;
    }

    try {
      await axiosInstance.put(`/goal/${goal._id}`, {
        title,
        description,
        currentAmount: Number(currentAmount),
        targetAmount: Number(targetAmount),
        targetDays: totalDays,
        category: selectedCategory.value,
        status,
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
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
          <CommonToolbar title={t("Edit Goal")} onBackPress={onClose} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("Goal Title")}</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#9CA3AF"
                  placeholder={t("Dream Home")}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("Description")}</Text>
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

              <View style={styles.amountRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>{t("Current Amount")} (₹)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    placeholder="1000"
                    keyboardType="numeric"
                    value={currentAmount}
                    onChangeText={setCurrentAmount}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>{t("Target Amount")} (₹)</Text>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                    placeholder="15000"
                    keyboardType="numeric"
                    value={targetAmount}
                    onChangeText={setTargetAmount}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("Target Duration")}</Text>
                <View style={styles.durationRow}>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder={t("Years")}
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={targetYears}
                      onChangeText={setTargetYears}
                    />
                    <Text style={styles.durationLabel}>{t("Years")}</Text>
                  </View>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder={t("Months")}
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={targetMonths}
                      onChangeText={setTargetMonths}
                    />
                    <Text style={styles.durationLabel}>{t("Months")}</Text>
                  </View>
                  <View style={styles.durationInput}>
                    <TextInput
                      placeholder={t("Days")}
                      keyboardType="numeric"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={targetDaysRemainder}
                      onChangeText={setTargetDaysRemainder}
                    />
                    <Text style={styles.durationLabel}>{t("Days")}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("Category")}</Text>
                <TouchableOpacity
                  style={styles.selector}
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <View style={styles.selectorContent}>
                    <Ionicons
                      name={selectedCategory.icon as any}
                      size={moderateScale(20)}
                      color="#4B5563"
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

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t("Status")}</Text>
                <TouchableOpacity
                  style={styles.selector}
                  onPress={() => setStatusModalVisible(true)}
                >
                  <View style={styles.selectorContent}>
                    <Ionicons
                      name={
                        goalStatuses.find((s) => s.value === status)?.icon ||
                        ("radio-button-on" as any)
                      }
                      size={moderateScale(20)}
                      color="#4B5563"
                      style={{ marginRight: scale(8) }}
                    />
                    <Text style={styles.selectorText}>
                      {t(
                        goalStatuses.find((s) => s.value === status)?.label ||
                          "Unknown"
                      )}
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
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>{t("Update Goal")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Picker Modal */}
        <Modal visible={categoryModalVisible} animationType="fade" transparent>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>{t("Select Category")}</Text>
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
                      color="#4B5563"
                      style={{ marginRight: scale(10) }}
                    />
                    <Text style={styles.pickerItemText}>{t(item.label)}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Status Picker Modal */}
        <Modal visible={statusModalVisible} animationType="fade" transparent>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>{t("Select Status")}</Text>
              <FlatList
                data={goalStatuses}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setStatus(item.value);
                      setStatusModalVisible(false);
                    }}
                  >
                    <Ionicons
                      name={item.icon || ("radio-button-on" as any)}
                      size={moderateScale(20)}
                      color="#4B5563"
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
      {loading && <LoaderFullScreen />}
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
    backgroundColor: "#4F46E5",
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
  label: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    color: "#374151",
    marginBottom: verticalScale(8),
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
  amountRow: {
    flexDirection: "row",
    gap: scale(12),
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
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    backgroundColor: "#FFFFFF",
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E5E7EB",
  },
  updateButton: {
    backgroundColor: Colors.primaryCyanColor,
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },
  updateButtonText: {
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
  pickerTitle: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
    marginBottom: verticalScale(16),
    textAlign: "center",
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
  },
});
