import axiosInstance from "@/src/apis/axiosInstance";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import { addDays, intervalToDuration } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import GoalProgress from "../components/GoalProgress";
import { goalCategories, goalStatuses, goalTypes } from "../constants";
import AddAmountModal from "./AddAmountModal";
import AddDaysModal from "./AddDaysModal";
import DeleteGoalModal from "./DeleteGoalModal";
import EditGoalModal from "./EditGoalModal";

interface GoalCardProps {
  goal: any;
  onUpdate: () => void;
}

const statusColors: Record<string, string> = {
  active: "#10B981",
  paused: "#F59E0B",
  completed: "#6B7280",
  cancelled: "#EF4444",
};

const categoryColors: Record<string, string> = {
  education: "#F59E0B",
  health: "#EF4444",
  travel: "#3B82F6",
  investment: "#10B981",
  other: "#8B5CF6",
};

export default function GoalCard({ goal, onUpdate }: GoalCardProps) {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [showDaysModal, setShowDaysModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t } = useTranslation();
  const [loadingTip, setLoadingTip] = useState(false);
  const [tip, setTip] = useState("");

  const fetchTip = async () => {
    try {
      setLoadingTip(true);
      setTip("");
      const response = await axiosInstance.post(`/ai/tip/${goal._id}`);
      setTip(response.data?.result?.tip || t("No tip available"));
    } catch (error) {
      console.error("Error fetching tip:", error);
      setTip(t("Failed to fetch tip"));
    } finally {
      setLoadingTip(false);
    }
  };

  const formatDuration = (days: number, t: (key: string) => string) => {
    const startDate = new Date(2000, 0, 1);
    const endDate = addDays(startDate, days);
    const duration = intervalToDuration({ start: startDate, end: endDate });

    const parts: string[] = [];
    if (duration.years)
      parts.push(
        `${duration.years} ${duration.years === 1 ? t("Year") : t("Years")}`
      );
    if (duration.months)
      parts.push(
        `${duration.months} ${duration.months === 1 ? t("Month") : t("Months")}`
      );
    if (duration.days)
      parts.push(
        `${duration.days} ${duration.days === 1 ? t("Day") : t("Days")}`
      );

    return parts.join(" ");
  };

  const handleAddAmount = async (amount: number) => {
    try {
      await axiosInstance.patch(`/goal/${goal._id}/add-amount`, { amount });
      onUpdate();
      setShowAmountModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExtend = async (extraDays: number) => {
    try {
      await axiosInstance.patch(`/goal/${goal._id}/extend-days`, { extraDays });
      onUpdate();
      setShowDaysModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/goal/${goal._id}`);
      onUpdate();
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const category = goalCategories.find((c) => c.value === goal.category);
  const goalType = goalTypes.find((t) => t.value === goal.type);
  const goalStatus = goalStatuses.find((s) => s.value === goal.status);

  const cardBorderColor = statusColors[goal.status] || "#E5E7EB";
  const categoryColor = categoryColors[goal.category] || "#9CA3AF";

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: cardBorderColor,
        },
      ]}
    >
      {/* Header with category icon and title */}
      <View style={styles.headerContainer}>
        <View
          style={[
            styles.categoryIconContainer,
            { backgroundColor: `${categoryColor}20` },
          ]}
        >
          <Ionicons
            name={category?.icon as any}
            size={moderateScale(24)}
            color={categoryColor}
          />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.description}>{goal.description}</Text>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowEditModal(true)}
        >
          <Ionicons
            name="create-outline"
            size={moderateScale(20)}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      {/* Status badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: `${cardBorderColor}20` },
        ]}
      >
        <Text style={[styles.statusText, { color: cardBorderColor }]}>
          {t(goalStatus?.label as string) || t(goal.status)}
        </Text>
      </View>

      {/* Progress section */}
      <View style={styles.progressContainer}>
        <GoalProgress percent={goal.progressPercent} color={cardBorderColor} />
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>
            ₹{goal.currentAmount.toLocaleString()}
          </Text>
          <Text style={styles.amountText}>
            ₹{goal.targetAmount.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Meta information */}
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Ionicons
            name={goalType?.icon as any}
            size={moderateScale(16)}
            color="#4B5563"
          />
          <Text style={styles.metaText}>
            {t(goalType?.label as string) || t(goal.type)}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons
            name="calendar-outline"
            size={moderateScale(16)}
            color="#4B5563"
          />
          <Text style={styles.metaText}>
            {t("Target")}: {new Date(goal.targetDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons
            name="time-outline"
            size={moderateScale(16)}
            color="#4B5563"
          />
          <Text style={styles.metaText}>
            {t("Duration")}: {formatDuration(goal.targetDays, t)}
          </Text>
        </View>
      </View>

      {/* AI Tip Section */}
      <View style={styles.tipContainer}>
        <TouchableOpacity
          style={styles.tipButton}
          onPress={fetchTip}
          disabled={loadingTip}
        >
          <Ionicons name="sparkles" size={moderateScale(18)} color="#7C3AED" />
          <Text style={styles.tipButtonText}>
            {loadingTip ? (
              <>
                {t("Thinking")}{" "}
                <ActivityIndicator size="small" color="#7C3AED" />
              </>
            ) : (
              t("Get AI Tip")
            )}
          </Text>
        </TouchableOpacity>

        {!!tip && (
          <View style={styles.tipBubble}>
            <Text style={styles.tipText}>💡 {tip}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#10B981" }]}
          onPress={() => setShowAmountModal(true)}
        >
          <Ionicons name="add-circle" size={moderateScale(18)} color="white" />
          <Text style={[styles.actionButtonText, { color: "white" }]}>
            {t("Add Amount")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#3B82F6" }]}
          onPress={() => setShowDaysModal(true)}
        >
          <Ionicons name="time" size={moderateScale(18)} color="white" />
          <Text style={[styles.actionButtonText, { color: "white" }]}>
            {t("Add Days")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={[styles.deleteButton, { borderColor: "#EF4444" }]}
        onPress={() => setShowDeleteModal(true)}
      >
        <Ionicons
          name="trash-outline"
          size={moderateScale(18)}
          color="#EF4444"
        />
        <Text style={[styles.deleteButtonText, { color: "#EF4444" }]}>
          {t("Delete Goal")}
        </Text>
      </TouchableOpacity>

      {/* Modals */}
      <AddAmountModal
        visible={showAmountModal}
        onClose={() => setShowAmountModal(false)}
        onSubmit={handleAddAmount}
      />
      <AddDaysModal
        visible={showDaysModal}
        onClose={() => setShowDaysModal(false)}
        onSubmit={handleExtend}
      />
      <EditGoalModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={onUpdate}
        goal={goal}
      />
      <DeleteGoalModal
        visible={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    elevation: 4,
    marginBottom: verticalScale(20),
    borderLeftWidth: moderateScale(6),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  categoryIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Regular",
    color: "#6B7280",
    lineHeight: verticalScale(20),
  },
  editButton: {
    padding: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: "#F3F4F6",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(16),
  },
  statusText: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-SemiBold",
  },
  progressContainer: {
    marginBottom: verticalScale(16),
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  progressLabel: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    color: "#4B5563",
  },
  progressPercent: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    color: "#111827",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(4),
  },
  amountText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#4B5563",
  },
  metaContainer: {
    marginBottom: verticalScale(16),
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  metaText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-Medium",
    color: "#4B5563",
    marginLeft: scale(8),
  },
  tipContainer: {
    marginBottom: verticalScale(16),
  },
  tipButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDE9FE",
    padding: verticalScale(12),
    borderRadius: moderateScale(8),
  },
  tipButtonText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    color: "#7C3AED",
    marginLeft: scale(8),
  },
  tipBubble: {
    marginTop: verticalScale(12),
    backgroundColor: "#F5F3FF",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  tipText: {
    fontSize: moderateScale(13),
    fontFamily: "Quicksand-Regular",
    color: "#6D28D9",
    lineHeight: verticalScale(20),
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    gap: scale(12),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: verticalScale(12),
    borderRadius: moderateScale(8),
    flex: 1,
  },
  actionButtonText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    marginLeft: scale(8),
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: verticalScale(12),
    borderRadius: moderateScale(8),
    borderWidth: 1,
  },
  deleteButtonText: {
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
    marginLeft: scale(8),
  },
});
