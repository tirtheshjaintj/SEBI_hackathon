import Colors from "@/src/theme/colors";
import { Feather } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView as GestureScrollView } from "react-native-gesture-handler";

interface DropdownItem {
  label: string;
  value: string;
}

interface AppInlineDropdownProps extends TextInputProps {
  label: string;
  items: DropdownItem[];
  selectedValue?: string | null;
  onValueChange: (value: string) => void;
  errorText?: string;
  placeholder?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  headingText?: string;
  allowAddNew?: boolean;
  onClickAddNew?: (value: string) => void;
  dropdownStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle | ViewStyle[];
  dropdownItemStyle?: ViewStyle;
  dropdownTextStyle?: TextStyle;
  activeColor?: string;
  dropdown?: boolean;
  isGestureEnabled?: boolean;
  dropDownRef?: any;
  inactiveColor?: string;
  iconColor?: string;
  allowFilter?: boolean;
  noResultsText?: string;
}

const AppInlineDropdown: React.FC<AppInlineDropdownProps> = ({
  label,
  items,
  selectedValue,
  onValueChange,
  errorText,
  placeholder = "Type or select an option",
  containerStyle,
  inputStyle,
  labelStyle,
  dropdownStyle,
  dropDownRef,
  dropdownItemStyle,
  dropdownTextStyle,
  inputContainerStyle,
  isGestureEnabled = false,
  allowAddNew = false,
  onClickAddNew,
  dropdown = true,
  headingText,
  activeColor = Colors.primaryCyanColor,
  inactiveColor = "#AAA",
  iconColor = "#666",
  allowFilter = true,
  noResultsText = "No matches found",
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState<DropdownItem[]>(items);
  const inputRef = useRef<RNTextInput>(null);
  const dropdownRef = useRef<View>(null);
  const { t } = useTranslation();
  const selectedItem = items.find((item) => item.value === selectedValue);

  useEffect(() => {
    if (allowFilter) {
      const filtered = items.filter((item) =>
        item.label
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      );
      setFilteredItems(filtered);
      // Close dropdown if no matches
      if (filtered.length === 0 && !allowAddNew) {
        setIsOpen(false);
      }
    } else {
      setFilteredItems(items);
    }
  }, [searchText, items, allowFilter, allowAddNew]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  const onItemPress = (item: DropdownItem) => {
    onValueChange(item.value?.trim());
    setSearchText(item.label?.trim());
    setIsOpen(false);
    setIsFocused(false);
  };

  const handleInputChange = (text: string) => {
    setSearchText(text);
    // onChangeText?.(text);
    setIsOpen(true);
    if (
      text &&
      !isOpen &&
      (allowFilter
        ? items.some((i) =>
          i.label.trim().toLowerCase().includes(text.toLowerCase().trim())
        )
        : true)
    ) {
      setIsOpen(true);
    }
    if (!text && selectedValue) {
      onValueChange("");
    }
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if ((searchText || items.length > 0 || allowAddNew) && !isOpen) {
      setIsOpen(true);
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    setTimeout(() => setIsOpen(false), 200);
    props.onBlur?.(e);
  };

  const reset = useCallback(() => {
    setSearchText("");
    onValueChange("");
    setFilteredItems(items);
  }, [items, onValueChange]);

  useImperativeHandle(dropDownRef, () => ({
    reset,
  }));

  const displayValue = selectedItem?.label || searchText || "";

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          {
            borderColor: isFocused ? activeColor : Colors.divider,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            labelStyle,
            {
              color: isFocused ? activeColor : inactiveColor,
              top: isFocused || selectedValue || searchText ? -8 : 14,
              fontSize: isFocused || selectedValue || searchText ? 12 : 16,
            },
          ]}
        >
          {label}
        </Text>

        <View style={styles.inputRow}>
          <RNTextInput
            ref={inputRef}
            value={displayValue}
            onChangeText={handleInputChange}
            style={[styles.input, inputStyle]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? t(placeholder) : ""}
            placeholderTextColor={inactiveColor}
            underlineColorAndroid="transparent"
            {...props}
          />
          {dropdown && (
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.iconButton}
            >
              <Feather
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={isFocused ? activeColor : iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {dropdown && isOpen && (filteredItems.length > 0 || allowAddNew) && (
        <View
          ref={dropdownRef}
          style={[
            styles.dropdown,
            dropdownStyle,
            // {
            //   borderColor: isFocused ? activeColor : Colors.divider,
            // },
          ]}
        >
          {headingText && filteredItems.length > 0 && (
            <Text style={styles.heading_text}>{headingText}</Text>
          )}
          {!isGestureEnabled ? (
            <ScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ gap: 8, paddingTop: 8 }}
            >
              {filteredItems.map((item, index) => (
                <TouchableOpacity
                  key={item.value + index}
                  activeOpacity={1}
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
              ))}
              {allowAddNew && searchText && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (onClickAddNew) {
                      setSearchText(searchText.trim());
                      onClickAddNew(searchText.trim());
                      toggleDropdown();
                    }
                  }}
                >
                  <Text style={styles.add_name_text}>Add : {searchText}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <GestureScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ gap: 8, paddingTop: 8 }}
            >
              {filteredItems.map((item, index) => (
                <TouchableOpacity
                  key={item.value + index}
                  activeOpacity={1}
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
              ))}
              {allowAddNew && searchText && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (onClickAddNew) {
                      setSearchText(searchText.trim());
                      onClickAddNew(searchText.trim());
                      toggleDropdown();
                    }
                  }}
                >
                  <Text style={styles.add_name_text}>Add : {searchText}</Text>
                </TouchableOpacity>
              )}
            </GestureScrollView>
          )}
        </View>
      )}

      {errorText && (
        <View style={styles.error_text_container}>
          <Feather name="info" size={12} color="red" style={{ marginTop: 2 }} />
          <Text style={styles.error_text}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  label: {
    position: "absolute",
    left: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    paddingTop: 4,
    paddingBottom: 8,
    paddingRight: 8,
  },
  iconButton: {
    padding: 8,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    marginTop: 6,
    width: "100%",
    maxHeight: 170,
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading_text: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
  dropdownItemText: {
    lineHeight: 18,
    fontSize: 14,
    color: Colors.textSecondaryLight,
    fontFamily: "Quicksand-Medium",
  },
  error_text_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 4,
    marginTop: 4,
  },
  add_name_text: {
    fontSize: 15,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textSecondaryDark,
    // textAlign: "center",
  },
  error_text: {
    color: "red",
    fontSize: 12,
    fontFamily: "Quicksand-Medium",
  },
});

export default AppInlineDropdown;
