import Colors from "@/src/theme/colors";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Confirmation = ({
  title,
  onCancel,
  onConfirm,
}: {
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title ?? t("Are you sure you?")}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>{t("Cancel")}</Text>
          </TouchableOpacity>

          
          <View style={{ width: scale(16) }} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmText}>{t("Confirm")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: scale(25),
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
    minWidth: "90%",
  },
  content: {
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: normalize(18),
    color: "#333",
    textAlign: "center",
    flexShrink: 1,
    marginBottom: verticalScale(25), // extra space for text
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(14), // more vertical space
    borderRadius: scale(8),
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: Colors.primaryCyanColor,
  },
  cancelText: {
    fontSize: normalize(16),
    color: "#333",
    textAlign: "center",
  },
  confirmText: {
    fontSize: normalize(16),
    color: "#fff",
    textAlign: "center",
  },
});

export default Confirmation;
