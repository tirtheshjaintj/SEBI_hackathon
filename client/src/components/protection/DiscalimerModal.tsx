import Colors from "@/src/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DisclaimerModalProps {
    visible: boolean;
    iconName: string;
    iconType?: "ionicons" | "material";
    title: string;
    message: string;
    onAccept: () => void;
    onReject: () => void;
}

export default function DisclaimerModal({
    visible,
    iconName,
    iconType = "ionicons",
    title,
    message,
    onAccept,
    onReject,
}: DisclaimerModalProps) {
    const IconComponent =
        iconType === "ionicons" ? Ionicons : MaterialCommunityIcons;
    const { t } = useTranslation();
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.iconCircle}>
                        <IconComponent name={iconName as any} size={36} color={Colors.primaryCyanColor} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.btn, styles.reject]} onPress={onReject}>
                            <Text style={styles.btnText}> {t(`Reject`)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.accept]} onPress={onAccept}>
                            <Text style={styles.btnText}> {t(`Accept`)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 340,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    iconCircle: {
        backgroundColor: Colors.primaryCyanColor + "20",
        padding: 12,
        borderRadius: 40,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
        marginBottom: 8,
        textAlign: "center",
    },
    message: {
        fontSize: 14,
        fontFamily: "Poppins-Regular",
        color: Colors.textSecondaryDark,
        textAlign: "center",
        marginBottom: 20,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    btn: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 6,
        borderRadius: 10,
        alignItems: "center",
    },
    accept: {
        backgroundColor: "#4CAF50",
    },
    reject: {
        backgroundColor: "#F44336",
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Poppins-Medium",
    },
});
