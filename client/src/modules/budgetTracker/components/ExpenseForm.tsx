import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ExpenseCategory } from "../screens/BudgetScreen";

const categories: ExpenseCategory[] = ["food", "travel", "entertainment", "groceries", "health", "education", "others"];

const ExpenseForm = ({
  expenses,
  setExpenses,
}: {
  expenses: Record<ExpenseCategory, number>;
  setExpenses: React.Dispatch<React.SetStateAction<Record<ExpenseCategory, number>>>;
}) => {
  const handleInputChange = (key: ExpenseCategory, value: string) => {
    const num = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    setExpenses((prev) => ({ ...prev, [key]: num }));
  };

  return (
    <View>
      {categories.map((key) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
            value={expenses[key].toString()}
            onChangeText={(value) => handleInputChange(key, value)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default ExpenseForm;
