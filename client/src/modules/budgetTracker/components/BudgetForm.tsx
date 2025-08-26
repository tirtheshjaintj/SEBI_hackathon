import AppTextInput from "@/src/components/formElements/AppTextInput";
import AppInlineDropdown from "@/src/components/formElements/AppTextInputWithPopup";
import Colors from "@/src/theme/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { categories } from "../constants/budget";
import { Feather } from "@expo/vector-icons";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

interface Props {
  sbuminHandler: (data: any, resetValues: () => void) => void;
}

const BudgetForm = ({ sbuminHandler }: Props) => {
  const [allCategories, setAllCategories] = React.useState(categories);
 
   const {t} = useTranslation()
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      description: "",
      amount: "",
    },
  });

  const onAddToList = ({ category }: { category: string }) => {
    const val = category.charAt(0).toUpperCase() + category.slice(1);
    setAllCategories((prev) => [...prev, val]);
  };

  const dropdownRef = React.useRef<any>(null);
  const resetValues = () => {
    reset(
      {
        category: "",
        description: "",
        amount: "",
      },
      { keepDirty: false }
    );
    dropdownRef?.current?.reset();
  };

  const onSubmit = handleSubmit((data) => {
    sbuminHandler(data, resetValues);
  });

  return (
    <View style={{ flex: 1, paddingVertical: 16 }}>
      <Text style={styles.title}>{t("Add Spending")}</Text>
      <View style={{ gap: errors ? 24 : 16 }}>
        {/* Category Dropdown */}
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field: { onChange, value } }) => (
            <AppInlineDropdown
              label={t("Select Category")}
              allowAddNew
              selectedValue={value}
              dropDownRef={dropdownRef}
              isGestureEnabled={true}
              placeholder={t("Select Category")}
              errorText={errors.category?.message}
              onClickAddNew={(val) => onAddToList({ category: val })}
              inputContainerStyle={{ minHeight: verticalScale(52) }}
              containerStyle={[styles.inputStyle]}
              items={allCategories.map((c) => ({ label: t(c), value: c }))}
              onValueChange={(val) => onChange(val)}
            />
          )}
        />

        {/* Description */}
        <Controller
          control={control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field: { onChange, value } }) => (
            <AppTextInput
              value={value}
              errorText={errors.description?.message}
              activeColor={Colors.primaryCyanColor}
              label={t("Description")}
              containerStyle={styles.inputStyle}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{
            required: "Amount is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Enter a valid amount",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppTextInput
              value={value}
              errorText={errors.amount?.message}
              keyboardType="numeric"
              activeColor={Colors.primaryCyanColor}
              label={t("Amount (₹)")}
              containerStyle={styles.inputStyle}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.fab}
        onPress={onSubmit}
      >
        <Feather name="check" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.textSecondaryDark,
  },
  inputStyle: {
    height: 50,
  },
  fab: {
    // position: "absolute",
    // right: 20,
    marginTop: 16,
    alignSelf: "flex-end",
    overflow: "hidden",
    // bottom: verticalScale(50),
    backgroundColor: Colors.primaryCyanColor,
    width: scale(60),
    height: scale(60),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
    zIndex: 1,
  },
});

export default BudgetForm;
