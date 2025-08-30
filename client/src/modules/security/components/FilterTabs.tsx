import Scroller from "@/src/components/scroller/Scroller";
import Colors from "@/src/theme/colors";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { filters } from "../constants/constant";

interface FilterTabsProps {
  filter: string;
  handleFilter: (filter: string) => void;
}

const FilterTabs = ({ filter, handleFilter }: FilterTabsProps) => {
  const { t } = useTranslation();
  return (
    <View style={{ marginVertical: 10, paddingLeft: 12 }}>
      <Scroller
        data={filters}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={item}
            onPress={() => handleFilter(item)}
            style={[
              styles.filterBtn,
              filter === item && styles.activeFilterBtn,
              // {
              //   shadowColor: "#000",
              //   shadowOffset: { width: 0, height: 3 },
              //   shadowOpacity: 0.1,
              //   shadowRadius: 5,
              //   elevation: 4,
              // },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {t(item)}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(6),
    marginRight: 10,
    marginVertical: 5,
    backgroundColor: "#f2f2f2",
    borderRadius: moderateScale(24),
    borderWidth: 1,
    borderColor: "#ccc",
    transform: [{ translateY: 0 }],
  },
  activeFilterBtn: {
    backgroundColor: Colors.darkYellow,
    borderColor: Colors.darkYellow,
    transform: [{ translateY: -2 }], // slight lift for 3D effect
  },
  filterText: {
    color: "#444",
    fontFamily: "Quicksand-Medium",
    fontSize: moderateScale(13),
  },
  activeFilterText: {
    color: "#fff",
    fontFamily: "Quicksand-Bold",
    fontSize: moderateScale(13),
  },
});

export default FilterTabs;
