import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  TextStyle,
  ViewStyle,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/src/theme/colors";
import ModalWrapper from "../modal/ModalWrapper";

interface DropdownItem {
  label: string;
  value: string;
}

interface AppDropdownInputProps {
  label: string;
  items: DropdownItem[];
  selectedValue?: string | null;
  onValueChange: (value: string) => void;
  errorText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle | ViewStyle[];
  dropdownStyle?: ViewStyle;
  dropdownItemStyle?: ViewStyle;
  dropdownTextStyle?: TextStyle;
  activeColor?: string;
  inactiveColor?: string;
  iconColor?: string;
  dropdownHeight?: number;
}

const AppDropdownInput: React.FC<AppDropdownInputProps> = ({
  label,
  items,
  selectedValue,
  onValueChange,
  errorText,
  placeholder = "Select an option",
  containerStyle,
  inputStyle,
  labelStyle,
  dropdownStyle,
  inputContainerStyle,
  dropdownItemStyle,
  dropdownTextStyle,
  activeColor = "#FF9800",
  inactiveColor = "#AAA",
  iconColor = "#666",
  dropdownHeight = 300,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const animatedLabel = useRef(
    new Animated.Value(selectedValue ? 1 : 0)
  ).current;

  const selectedItem = items.find((item) => item.value === selectedValue);

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || selectedValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectedValue]);

  const labelAnimatedStyle = {
    position: "absolute" as const,
    left: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isFocused ? activeColor : inactiveColor,
    ...labelStyle,
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const onItemPress = (item: DropdownItem) => {
    onValueChange(item.value);
    setIsOpen(false);
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          inputContainerStyle,
          {
            borderColor: isFocused ? activeColor : Colors.divider,
          },
        ]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Animated.Text style={labelAnimatedStyle}>{label ?? ""}</Animated.Text>

        <View style={styles.valueContainer}>
          <Text
            style={[
              styles.inputText,
              inputStyle,
              !selectedValue && { color: inactiveColor },
            ]}
          >
            {selectedItem?.label}
          </Text>
          <Feather
            style={styles.icon}
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={isFocused ? activeColor : iconColor}
          />
        </View>
      </TouchableOpacity>

      <ModalWrapper
        visible={isOpen}
        onClose={toggleDropdown}
        animationType="fade"
      >
        <View
          style={[
            styles.dropdown,
            dropdownStyle,
            { maxHeight: dropdownHeight },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            // contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dropdownItem, dropdownItemStyle]}
                onPress={() => onItemPress(item)}
              >
                <Text style={[styles.dropdownItemText, dropdownTextStyle]}>
                  {item.label}
                </Text>
                {selectedValue === item.value && (
                  <Feather name="check" size={16} color={activeColor} />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ModalWrapper>

      {errorText && (
        <View style={styles.error_text_container}>
          <Feather name="info" size={12} color="red" />
          <Text style={styles.error_text}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // backgroundColor: "pink",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: "100%",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    gap: 4,
    alignItems: "center",
    position: "relative",
  },
  icon: {},
  inputText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: Dimensions.get("window").width - 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 8,
  },
  error_text_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
    marginTop: 4,
  },
  error_text: {
    color: "red",
    fontSize: 12,
    fontFamily: "Quicksand-Medium",
  },
});

export default AppDropdownInput;
