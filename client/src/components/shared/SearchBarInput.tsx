import Colors from "@/src/theme/colors";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Loader from "../loaders/Loader";

interface SearchBarInputProps extends TextInputProps {
  handleOnChange: (text: string) => void;
  searchLoader?: boolean;
  placeholder?: string;
}

const SearchBarInput = ({
  handleOnChange,
  searchLoader,
  placeholder,
  ...props
}: SearchBarInputProps) => {
  return (
    <View style={styles.parent_container}>
      <TextInput
        placeholderTextColor="#999"
        onChangeText={handleOnChange}
        placeholder={placeholder}
        style={styles.search_input}
        {...props}
      />
      {searchLoader ? (
        <View style={styles.search_loader_icon}>
          <Loader />
        </View>
      ) : (
        <Feather
          name="search"
          size={22}
          color={Colors.textSecondaryLight}
          style={styles.search_icon}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent_container: {
    borderRadius: 16,
    overflow: "hidden",
    fontFamily: "Quicksand",
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  search_input: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: Colors.textSecondaryLight,
  },
  search_icon: {
    position: "absolute",
    top: 12,
    right: 15,
    backgroundColor: Colors.white,
    color: Colors.textSecondaryLight,
  },
  search_loader_icon: {
    position: "absolute",
    height: 22,
    width: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 12,
    right: 15,
  },
});

export default SearchBarInput;
