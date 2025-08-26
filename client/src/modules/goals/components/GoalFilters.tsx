import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { goalCategories, goalStatuses, goalTypes } from "../constants";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import Colors from "@/src/theme/colors";

interface GoalFiltersProps {
  onFilterChange: (filters: {
    status: string;
    category: string;
    type: string;
  }) => void;
}

export default function GoalFilters({ onFilterChange }: GoalFiltersProps) {
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    onFilterChange({ status, category, type });
  }, [status, category, type]);

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("Filter Your Goals")}</Text>
      <View style={styles.row}>
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          itemTextStyle={styles.dropdownItemText}
          data={[
            { label: t("All"), value: "" },
            ...goalStatuses.map((status) => ({
              ...status,
              label: t(status.label),
            })),
          ]}
          labelField="label"
          valueField="value"
          placeholder={t("Status")}
          value={status}
          onChange={(item) => setStatus(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          itemTextStyle={styles.dropdownItemText}
          data={[
            { label: t("All"), value: "" },
            ...goalCategories.map((category) => ({
              ...category,
              label: t(category.label),
            })),
          ]}
          labelField="label"
          valueField="value"
          placeholder={t("Category")}
          value={category}
          onChange={(item) => setCategory(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          itemTextStyle={styles.dropdownItemText}
          data={[
            { label: t("All"), value: "" },
            ...goalTypes.map((type) => ({
              ...type,
              label: t(type.label),
            })),
          ]}
          labelField="label"
          valueField="value"
          placeholder={t("Type")}
          value={type}
          onChange={(item) => setType(item.value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
    backgroundColor: Colors.white,
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: Colors.divider,
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: "Poppins-SemiBold",
    color: "#111827",
    marginBottom: verticalScale(8),
    letterSpacing: scale(0.2),
  },
  row: {
    flexDirection: "row",
    gap: scale(10),
  },
  dropdown: {
    flex: 1,
    height: verticalScale(44),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: Colors.divider,
    backgroundColor: "#ffffff",
    paddingHorizontal: moderateScale(12),
  },
  dropdownText: {
    fontSize: moderateScale(13),
    fontFamily: "Quicksand-Medium",
    color: "#374151",
  },
  dropdownPlaceholder: {
    fontSize: moderateScale(13),
    fontFamily: "Quicksand-Regular",
    color: "#9CA3AF",
  },
  dropdownItemText: {
    fontSize: moderateScale(13),
    fontFamily: "Quicksand-Regular",
    color: "#374151",
  },
});
